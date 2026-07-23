import { env } from "$env/dynamic/private";
import { handles, isSet } from "$lib/config";
import { cached, fetchJson } from "./cache";

const API = "https://ws.audioscrobbler.com/2.0/";

// Now-playing/recent must feel live — Last.fm itself is accurate within ~30s,
// so match it. The top-artists list moves slowly and can cache for much longer.
const RECENT_TTL = 20 * 1000; // 20s
const TOP_TTL = 30 * 60 * 1000; // 30m
const DEEZER_TTL = 7 * 24 * 60 * 60 * 1000; // 7d — artist art never changes

// Last.fm stopped serving artist images and now hands back this one grey-star
// placeholder for every artist. Treat any URL containing it as "no image".
const LASTFM_PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

export interface Artist {
	name: string;
	plays: number;
	url: string;
	image: string | null;
}

export interface Track {
	name: string;
	artist: string;
	url: string;
	image: string | null;
	nowPlaying: boolean;
	playedAt: string | null;
}

export interface MusicStats {
	topArtists: Artist[];
	recent: Track[];
	/** Non-null when Last.fm reports a track currently scrobbling. */
	nowPlaying: Track | null;
}

interface LfmImage {
	"#text": string;
	size: string;
}

interface TopArtistsResponse {
	topartists?: {
		artist: {
			name: string;
			playcount: string;
			url: string;
			image?: LfmImage[];
		}[];
	};
}

interface RecentTracksResponse {
	recenttracks?: {
		track: {
			name: string;
			url: string;
			artist: { "#text": string };
			image?: LfmImage[];
			date?: { uts: string };
			"@attr"?: { nowplaying?: string };
		}[];
	};
}

interface DeezerSearchResponse {
	data?: { picture_medium?: string; picture_big?: string }[];
}

/** Largest non-empty, non-placeholder Last.fm image, or null. */
function pickImage(images: LfmImage[] | undefined): string | null {
	if (!images?.length) return null;
	for (const size of ["extralarge", "large", "medium"]) {
		const hit = images.find((i) => i.size === size && i["#text"]);
		if (hit && !hit["#text"].includes(LASTFM_PLACEHOLDER)) return hit["#text"];
	}
	return null;
}

/**
 * Real artist artwork, sourced from Deezer's public search API (no key, no
 * auth). Cached hard because artist pictures effectively never change.
 */
function deezerArtistImage(name: string): Promise<string | null> {
	return cached(`deezer:${name.toLowerCase()}`, DEEZER_TTL, async () => {
		const res = await fetchJson<DeezerSearchResponse>(
			`https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}&limit=1`,
		);
		const hit = res?.data?.[0];
		return hit?.picture_medium ?? hit?.picture_big ?? null;
	});
}

async function loadTopArtists(base: string): Promise<Artist[]> {
	const top = await fetchJson<TopArtistsResponse>(
		`${base}&method=user.gettopartists&period=1month&limit=8`,
	);

	// Last.fm's own images are all the placeholder, so go straight to Deezer.
	return Promise.all(
		(top?.topartists?.artist ?? []).map(async (a) => ({
			name: a.name,
			plays: Number(a.playcount) || 0,
			url: a.url,
			image: await deezerArtistImage(a.name),
		})),
	);
}

async function loadRecent(
	base: string,
): Promise<{ recent: Track[]; nowPlaying: Track | null }> {
	const recent = await fetchJson<RecentTracksResponse>(
		`${base}&method=user.getrecenttracks&limit=8`,
	);

	const tracks: Track[] = await Promise.all(
		(recent?.recenttracks?.track ?? []).map(async (t) => {
			// Album art usually works; if it's missing/placeholder, fall back to
			// the artist's Deezer picture so the now-playing tile isn't empty.
			const image =
				pickImage(t.image) ?? (await deezerArtistImage(t.artist["#text"]));
			return {
				name: t.name,
				artist: t.artist["#text"],
				url: t.url,
				image,
				nowPlaying: t["@attr"]?.nowplaying === "true",
				playedAt: t.date
					? new Date(Number(t.date.uts) * 1000).toISOString()
					: null,
			};
		}),
	);

	return {
		// Drop the now-playing entry from history so it isn't shown twice.
		recent: tracks.filter((t) => !t.nowPlaying).slice(0, 6),
		nowPlaying: tracks.find((t) => t.nowPlaying) ?? null,
	};
}

export async function getMusicStats(): Promise<MusicStats | null> {
	const key = env.LASTFM_API_KEY;
	if (!isSet(handles.lastfm) || !key) return null;
	const user = handles.lastfm;
	const base = `${API}?api_key=${key}&user=${encodeURIComponent(user)}&format=json`;

	// Two independent caches: recent refreshes fast, top artists slowly.
	const [topArtists, recent] = await Promise.all([
		cached(`lastfm:top:${user}`, TOP_TTL, () => loadTopArtists(base)),
		cached(`lastfm:recent:${user}`, RECENT_TTL, () => loadRecent(base)),
	]);

	if (!topArtists.length && !recent.recent.length && !recent.nowPlaying) {
		return null;
	}

	return {
		topArtists,
		recent: recent.recent,
		nowPlaying: recent.nowPlaying,
	};
}

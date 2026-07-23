<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { handles } from "$lib/config";
import type { MusicStats } from "$lib/server/lastfm";

let { stats }: { stats: MusicStats | null } = $props();

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "3 hours ago" from an ISO timestamp, largest sensible unit. */
function ago(iso: string | null): string {
	if (!iso) return "";
	const seconds = (Date.now() - new Date(iso).getTime()) / 1000;
	const units: [Intl.RelativeTimeFormatUnit, number][] = [
		["day", 86400],
		["hour", 3600],
		["minute", 60],
	];
	for (const [unit, size] of units) {
		if (seconds >= size) return rtf.format(-Math.floor(seconds / size), unit);
	}
	return "just now";
}
</script>

<section class="card ticked">
	<div class="card-label">
		<span class="flex items-center gap-2">
			<Icon name="music" size={13} />
			listening
		</span>
		{#if stats}
			<a
				href="https://www.last.fm/user/{handles.lastfm}"
				class="flex items-center gap-1 normal-case hover:text-frost"
			>
				last.fm
				<Icon name="arrow-up-right" size={11} />
			</a>
		{/if}
	</div>

	<div class="card-body">
		{#if !stats}
			<p class="font-mono text-xs leading-relaxed text-faint">
				Set <span class="text-frost">handles.lastfm</span> in
				<span class="text-dim">src/lib/config.ts</span> and add
				<span class="text-dim">LASTFM_API_KEY</span> to your .env — see .env.example.
			</p>
		{:else}
			{#if stats.nowPlaying}
				{@const track = stats.nowPlaying}
				<a
					href={track.url}
					class="mb-5 flex items-center gap-3 border border-line bg-bg-deep p-3 transition-colors hover:border-steel"
				>
					{#if track.image}
						<img
							src={track.image}
							alt=""
							width="48"
							height="48"
							class="size-12 shrink-0 border border-line object-cover"
						/>
					{/if}
					<div class="min-w-0">
						<p class="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-aurora-green uppercase">
							<span class="pulse-dot inline-block size-1.5 bg-aurora-green"></span>
							scrobbling now
						</p>
						<p class="mt-1 truncate text-sm text-text">{track.name}</p>
						<p class="truncate font-mono text-xs text-muted">{track.artist}</p>
					</div>
				</a>
			{/if}

			{#if stats.topArtists.length}
				<p class="mb-3 font-mono text-[0.625rem] tracking-[0.14em] text-faint uppercase">
					top artists · 30d
				</p>
				<ul class="grid grid-cols-4 gap-2">
					{#each stats.topArtists.slice(0, 8) as artist (artist.name)}
						<li>
							<a href={artist.url} class="group block" title="{artist.name} — {artist.plays} plays">
								<div class="relative aspect-square border border-line bg-bg-deep">
									{#if artist.image}
										<img
											src={artist.image}
											alt=""
											loading="lazy"
											class="size-full object-cover transition-opacity group-hover:opacity-75"
										/>
									{:else}
										<div class="grid size-full place-items-center">
											<Icon name="music" size={14} class="text-faint" />
										</div>
									{/if}
								</div>
								<p class="mt-1.5 truncate font-mono text-[0.625rem] text-muted group-hover:text-dim">
									{artist.name}
								</p>
							</a>
						</li>
					{/each}
				</ul>
			{/if}

			{#if stats.recent.length}
				<div class="mt-5 border-t border-line pt-4">
					<p class="mb-2.5 font-mono text-[0.625rem] tracking-[0.14em] text-faint uppercase">
						recently played
					</p>
					<ul class="space-y-2">
						{#each stats.recent.slice(0, 5) as track (track.url + track.playedAt)}
							<li>
								<a
									href={track.url}
									class="flex items-baseline justify-between gap-3 text-xs transition-colors hover:text-text"
								>
									<span class="min-w-0 truncate text-dim">
										{track.name}
										<span class="text-faint">— {track.artist}</span>
									</span>
									<span class="shrink-0 font-mono text-[0.625rem] text-faint">
										{ago(track.playedAt)}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}
	</div>
</section>

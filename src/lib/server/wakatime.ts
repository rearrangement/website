import { env } from "$env/dynamic/private";
import { handles, isSet, wakatimeProjects } from "$lib/config";
import { cached, fetchJson } from "./cache";

const TTL = 10 * 60 * 1000; // 10min

export interface WakaLanguage {
	name: string;
	text: string;
	percent: number;
}

export interface WakaProject {
	name: string;
	text: string;
	percent: number;
}

export interface WakaStats {
	total: string;
	dailyAverage: string;
	languages: WakaLanguage[];
	editors: WakaLanguage[];
	projects: WakaProject[];
	range: string;
}

interface WakaResponse {
	data?: {
		human_readable_total: string;
		human_readable_daily_average: string;
		human_readable_range: string;
		languages?: WakaLanguage[];
		editors?: WakaLanguage[];
		projects?: WakaProject[];
	};
}

const ALLOWED = new Set(wakatimeProjects.map((p) => p.trim().toLowerCase()));

const MOCK_STATS: WakaStats = {
	total: "18 hrs 42 mins",
	dailyAverage: "2 hrs 40 mins",
	range: "Last 7 Days (mock)",
	languages: [
		{ name: "TypeScript", text: "9 hrs 12 mins", percent: 49 },
		{ name: "Svelte", text: "4 hrs 3 mins", percent: 22 },
		{ name: "CSS", text: "2 hrs 30 mins", percent: 13 },
		{ name: "Rust", text: "1 hr 40 mins", percent: 9 },
		{ name: "Bash", text: "1 hr 17 mins", percent: 7 },
	],
	editors: [
		{ name: "Neovim", text: "12 hrs", percent: 64 },
		{ name: "VS Code", text: "6 hrs 42 mins", percent: 36 },
	],
	projects: [
		{ name: "portfolio", text: "8 hrs 20 mins", percent: 45 },
		{ name: "winstro", text: "6 hrs 10 mins", percent: 33 },
		{ name: "evermind", text: "4 hrs 12 mins", percent: 22 },
	],
};

export async function getWakatimeStats(): Promise<WakaStats | null> {
	if (env.WAKATIME_MOCK === "true") {
		console.warn(
			"[wakatime] serving MOCK data; unset WAKATIME_MOCK to disable",
		);
		return MOCK_STATS;
	}
	if (!isSet(handles.wakatime)) return null;
	const user = handles.wakatime;

	return cached(`wakatime:${user}`, TTL, async () => {
		const res = await fetchJson<WakaResponse>(
			`https://wakatime.com/api/v1/users/${user}/stats/last_7_days`,
		);
		if (!res?.data) return null;

		const top = (list: WakaLanguage[] | undefined) =>
			(list ?? []).slice(0, 5).map((l) => ({
				name: l.name,
				text: l.text,
				percent: Math.round(l.percent),
			}));

		const projects: WakaProject[] = (res.data.projects ?? [])
			.filter((p) => ALLOWED.has(p.name.trim().toLowerCase()))
			.map((p) => ({
				name: p.name,
				text: p.text,
				percent: Math.round(p.percent),
			}));

		return {
			total: res.data.human_readable_total,
			dailyAverage: res.data.human_readable_daily_average,
			range: res.data.human_readable_range,
			languages: top(res.data.languages),
			editors: top(res.data.editors),
			projects,
		};
	});
}

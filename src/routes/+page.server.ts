import { getGithubStats } from "$lib/server/github";
import { getMusicStats } from "$lib/server/lastfm";
import { getWakatimeStats } from "$lib/server/wakatime";
import { getWeather } from "$lib/server/weather";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const [github, wakatime, music, weather] = await Promise.all([
		getGithubStats(),
		getWakatimeStats(),
		getMusicStats(),
		getWeather(),
	]);

	return { github, wakatime, music, weather };
};

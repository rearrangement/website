import { env } from "$env/dynamic/private";
import { handles, isSet } from "$lib/config";
import { cached, fetchJson } from "./cache";

const TTL = 2 * 60 * 60 * 1000; // 2h

export interface ContributionDay {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

export interface LanguageSlice {
	name: string;
	count: number;
	percent: number;
}

export interface GithubStats {
	total: number;
	days: ContributionDay[];
	languages: LanguageSlice[];
	repos: number;
	stars: number;
	followers: number;
}

interface ContributionsResponse {
	total: Record<string, number>;
	contributions: ContributionDay[];
}

interface Repo {
	language: string | null;
	stargazers_count: number;
	fork: boolean;
}

interface User {
	public_repos: number;
	followers: number;
}

function ghHeaders(): Record<string, string> {
	const token = env.GITHUB_TOKEN;
	return token ? { authorization: `Bearer ${token}` } : {};
}

export async function getGithubStats(): Promise<GithubStats | null> {
	if (!isSet(handles.github)) return null;
	const user = handles.github;

	return cached(`github:${user}`, TTL, async () => {
		const [contrib, repos, profile] = await Promise.all([
			fetchJson<ContributionsResponse>(
				`https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
			),
			fetchJson<Repo[]>(
				`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`,
				{ headers: ghHeaders() },
			),
			fetchJson<User>(`https://api.github.com/users/${user}`, {
				headers: ghHeaders(),
			}),
		]);

		if (!contrib) return null;

		const own = (repos ?? []).filter((r) => !r.fork);
		const tally = new Map<string, number>();
		for (const repo of own) {
			if (!repo.language) continue;
			tally.set(repo.language, (tally.get(repo.language) ?? 0) + 1);
		}
		const totalTagged = [...tally.values()].reduce((a, b) => a + b, 0);
		const languages: LanguageSlice[] = [...tally.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 6)
			.map(([name, count]) => ({
				name,
				count,
				percent: totalTagged ? Math.round((count / totalTagged) * 100) : 0,
			}));

		return {
			total: Object.values(contrib.total).reduce((a, b) => a + b, 0),
			days: contrib.contributions,
			languages,
			repos: profile?.public_repos ?? own.length,
			stars: own.reduce((a, r) => a + r.stargazers_count, 0),
			followers: profile?.followers ?? 0,
		};
	});
}

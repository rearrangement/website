/**
 * Everything personal lives here. Fill in the blanks below and the widgets
 * light up; leave one empty and that widget renders a quiet "not configured"
 * state instead of erroring.
 */

export const site = {
	/** Displayed name. Keep it short. */
	name: "Dylan",
	/** Used in the <title> suffix and the nav wordmark. */
	handle: "dylan",
	domain: "wisest.cc",
	url: "https://wisest.cc",
	tagline: "Backend-leaning generalist who likes small, sharp tools.",
	description:
		"Personal site of Dylan — projects, writing, and a bit of live telemetry.",
	email: "wise@wisest.cc",
	blog: "https://blog.wisest.cc",
} as const;

export const socials = [
	// href is what's linked; label is the mono text shown next to the icon.
	{
		label: "github",
		href: "https://github.com/mostwise/website",
		icon: "github",
	},
	{ label: "blog", href: site.blog, icon: "rss" },
	{ label: "email", href: `mailto:${site.email}`, icon: "mail" },
] as const;

/**
 * The /socials page. Two lists: ways to actually reach me, and profiles you
 * can look at without talking to me. Handles here are PUBLIC by definition —
 * this module ships to the browser, so never put an unlisted account here.
 */
export const contact = [
	{
		platform: "discord",
		icon: "discord",
		handle: "@imsoftaspowder",
		href: "https://discord.com/users/1204149467251613756",
		note: "My main mode of communication, and the fastest way to get a reply.",
	},
	{
		platform: "signal",
		icon: "signal",
		handle: "@wisest.33",
		href: "https://signal.org",
		note: "If you'd rather not use Discord. Better for anything private.",
	},
	{
		platform: "email",
		icon: "mail",
		handle: site.email,
		href: `mailto:${site.email}`,
		note: "Slowest of the three, but the right choice for anything important.",
	},
] as const;

export const profiles = [
	{
		platform: "github",
		icon: "github",
		handle: "@mostwise",
		href: "https://github.com/mostwise",
		note: "Everything I build in public, including this site.",
	},
	{
		platform: "spotify",
		icon: "spotify",
		handle: "@dylan",
		href: "https://open.spotify.com/user/ip24s6xdgak5k5rjnuqc59qo4",
		note: "Make fun of my music taste, or don't. I'm happy to talk about it either way.",
	},
	{
		platform: "steam",
		icon: "steam",
		handle: "@mostwise",
		href: "https://steamcommunity.com/id/mostwise",
		note: "What I play when I'm not at a terminal.",
	},
	{
		platform: "monkeytype",
		icon: "monkeytype",
		handle: "@dylnn",
		href: "https://monkeytype.com/profile/dylnn",
		note: "Typing stats. I haven't been active here in a while.",
	},
	{
		platform: "mastodon",
		icon: "mastodon",
		handle: "@shxrk@defcon.social",
		href: "https://defcon.social/@shxrk",
		note: "Mostly dormant, though I keep meaning to use it properly.",
	},
	{
		platform: "bluesky",
		icon: "bluesky",
		handle: "@0xdyl.bsky.social",
		href: "https://bsky.app/profile/0xdyl.bsky.social",
		note: "Claimed the handle early and have barely touched it since.",
	},
] as const;

/**
 * Handles for the live widgets.
 *
 * discordUserId — enable Developer Mode in Discord, right-click your avatar,
 *   "Copy User ID". You must also join https://discord.gg/lanyard once so the
 *   Lanyard API is allowed to read your presence. No token needed.
 * github        — your github username, e.g. "torvalds".
 * wakatime      — your wakatime username. Requires Settings ▸ "Display coding
 *   activity publicly" to be ON, otherwise the API returns 401.
 * lastfm        — your last.fm username. See LASTFM_API_KEY in .env.example.
 */
export const handles = {
	discordUserId: "1204149467251613756",
	github: "mostwise",
	wakatime: "99e53fb8-710a-4805-9b88-21bc1c28eaa9",
	lastfm: "mostwise",
} as const;

/**
 * Drives the clock. Both fields are PUBLIC — this module is imported by a
 * component, so everything here is bundled into the browser JS in plaintext.
 * Keep `label` coarse ("east coast", "NYC"), never a street address.
 *
 * Weather coordinates deliberately live in .env instead, server-side only —
 * see WEATHER_LAT / WEATHER_LON in .env.example.
 */
export const location = {
	label: "My House",
	timezone: "America/New_York",
} as const;

/**
 * Allowlist of WakaTime project names to show in the "projects" row of the
 * WakaTime card. ONLY these appear — anything not listed (corporate work,
 * scratch repos, anything you start later) is never rendered.
 *
 * Filtering happens server-side, so unlisted project names never reach the
 * browser. An empty array hides the projects row entirely (safe default).
 * Match the names exactly as WakaTime shows them; case is ignored.
 *
 * Requires "Display projects publicly" ON in WakaTime settings, otherwise the
 * API omits projects and this row stays empty.
 */
export const wakatimeProjects: string[] = [];

/** True when a config value has actually been filled in. */
export function isSet(value: string): boolean {
	return value.trim().length > 0;
}

/** Grouped so the tech section can render one column per group. */
export const stack = [
	{
		group: "languages",
		items: [
			"TypeScript",
			"Go (learning)",
			"Rust (learning)",
			"C# (beginner)",
			"Bash",
			"JavaScript",
		],
	},
	{
		group: "frameworks",
		items: [
			"SvelteKit",
			"Next.js",
			"React",
			"Tailwind",
			"Astro",
			"TanStack Start",
		],
	},
	{
		group: "infra",
		items: [
			"Linux",
			"Docker",
			"Proxmox",
			"Kubernetes",
			"Cloudflare",
			"GitHub Actions",
		],
	},
	{
		group: "tooling",
		items: ["Neovim", "Git", "Biome", "Vite", "Playwright", "Bun"],
	},
] as const;

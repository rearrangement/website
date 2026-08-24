// This is to make the site deployable for other people just in case they want to use it aswell

export const site = {
	name: "Dylan",
	handle: "dylan",
	domain: "wisest.cc",
	url: "https://wisest.cc",
	tagline: "Backend-leaning generalist who likes small, sharp tools.",
	description:
		"My personal projects, writing, and some live telemetry.",
	email: "wise@wisest.cc",
	blog: "https://blog.wisest.cc",
} as const;

export const socials = [
	{
		label: "github",
		href: "https://github.com/mostwise/website",
		icon: "github",
	},
	{ label: "blog", href: site.blog, icon: "rss" },
	{ label: "email", href: `mailto:${site.email}`, icon: "mail" },
] as const;

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

export const handles = {
	discordUserId: "1204149467251613756",
	github: "mostwise",
	wakatime: "99e53fb8-710a-4805-9b88-21bc1c28eaa9",
	lastfm: "mostwise",
} as const;

export const location = {
	label: "My House",
	timezone: "America/New_York",
} as const;

export const wakatimeProjects: string[] = [];

export function isSet(value: string): boolean {
	return value.trim().length > 0;
}

export const stack = [
	{
		group: "languages",
		items: [
			"TypeScript",
			"Go",
			"Rust (learning)",
			"C#",
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
			"Supabase",
			"Kubernetes",
			"Cloudflare"
		],
	},
	{
		group: "tooling",
		items: ["Neovim", "Git", "Biome", "Vite", "Playwright", "Bun"],
	},
] as const;

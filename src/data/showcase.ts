export interface ShowcaseItem {
	name: string;
	href: string;
	stack: string;
	badge?: string;
	desc: string;
}

export const showcase: ShowcaseItem[] = [
	{
		name: "evermind",
		href: "https://evermind.shxrk.dev",
		stack: "Next.js · TailwindCSS · Vercel",
		badge: "OSS",
		desc: "A minimal, very useful student planner used for keeping track of your assignments. I even use this myself!",
	},
	{
		name: "winstro",
		href: "https://github.com/WickedSoftworks/winstro",
		stack: "TypeScript · CLI · PowerShell",
		badge: "CLI",
		desc: "A simple CLI program to make Windows have the same reproducible, consistent environment that Linux has.",
	},
	{
		name: "clawk",
		href: "https://clawk.wisest.cc",
		stack: "Next.js · TailwindCSS · Vercel",
		desc: "A simple, minimal, clock application that I made to tell the time. Has support for almost every timezone!",
	},
];

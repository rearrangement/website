/**
 * Projects are plain data. `body` is rendered as HTML inside `.prose`, so you
 * can write real markup here — headings, lists, code blocks, links.
 *
 * The `slug` becomes the URL: /projects/{slug}
 */

export type ProjectStatus = "active" | "maintained" | "archived" | "experiment";

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	slug: string;
	name: string;
	/** One line. Shown on the gallery card and in the popout header. */
	summary: string;
	/** A few sentences. Shown at the top of the popout, above the long body. */
	blurb: string;
	year: string;
	status: ProjectStatus;
	stack: string[];
	links: ProjectLink[];
	/** Shown on the home page in the "selected work" strip. */
	featured?: boolean;
	/** HTML. Rendered inside .prose. */
	body: string;
}

export const projects: Project[] = [
	{
		slug: "wisest-cc",
		name: "wisest.cc",
		summary: "This site — SvelteKit, Nord, and a pile of live telemetry.",
		blurb:
			"A personal site that doubles as a status page for myself. Everything square, everything server-rendered, and a handful of widgets that pull live data from the services I already use.",
		year: "2026",
		status: "active",
		stack: ["SvelteKit", "Svelte 5", "TypeScript", "Tailwind v4"],
		links: [
			{ label: "source", href: "https://github.com/mostwise/website" },
			{ label: "live", href: "https://wisest.cc" },
		],
		featured: true,
		body: `
<p>I wanted a portfolio that wasn't something stupid with poorly designed aesthetics. 
What I've started to realize is that the most interesting part of a developer's portfolio
is how they can articulate it and make it look awesome. It might not be the most technical showcase
of what they can do, but it is a showcase of their ability to make something polished and finished.

</p>

<h2>Design</h2>
<p>Nord's polar-night palette, dark only, and <strong>every corner square</strong>.
The radius namespace is unset at the Tailwind theme level, so
<code>rounded-*</code> utilities don't exist in this codebase (inspired by vite!!)</p>

<h2>The live bits</h2>
<ul>
<li><strong>Discord presence</strong> powered by Lanyard; status, current
activity, and Spotify now-playing, pushed in real time.</li>
<li><strong>GitHub</strong> contribution heatmap and language breakdown.</li>
<li><strong>WakaTime</strong> weekly coding hours.</li>
<li><strong>Last.fm</strong> top artists and recent scrobbles.</li>
<li><strong>Weather and local time</strong> via Open-Meteo.</li>
</ul>
<p>Everything except Discord is fetched server-side on a cache, so the browser
never sees an API key and the page still renders if a provider is down.</p>

<h2>Notes</h2>
<p>Project popouts use SvelteKit's shallow routing: clicking a card in the
gallery pushes a real URL and opens a dialog, but loading that URL directly
gives you a full page. One set of content, two presentations.</p>
`.trim(),
	},
	{
		slug: "winstro",
		name: "Winstro",
		summary: "A simple CLI project — make Windows more reproducible.",
		blurb:
			"This is a simple, lightweight, easy-to-install CLI tool for Windows that makes it easier to install and configure software in a reproducible way.",
		year: "2025",
		status: "maintained",
		stack: ["TypeScript", "Bun"],
		links: [
			{
				label: "source",
				href: "https://github.com/WickedSoftworks/winstro",
			},
		],
		featured: true,
		body: `
<p>
Windows sucks. Linux is awesome. Winstro is a simple CLI tool that makes Windows more reproducible and easier to configure. 
It allows you to install and configure software in a way that is similar to how you would distribute your dots on Linux, 
making it easier to manage your Windows environment across multiple installations.
</p>

<h2>Lessons Learned</h2>
<ul>
<li>I'd reset Windows too often to keep having to search and spend hours getting all my required tools back.</li>
<li>This was going to be an Electron project, but Electron is a bit heavy for this use case.</li>
<li>This was a blast to make, it really took off and helped me learn a lot about CLI development and TypeScript as a whole.</li>
</ul>
`.trim(),
	},
	{
		slug: "evermind",
		name: "Evermind",
		summary:
			"The beautiful, sleek, online student planner — never miss another deadline.",
		blurb:
			"This is a beautiful, sleek, online student planner that was built to help you stay organized, ditch the paper, and never miss another deadline. It was built with students in mind, and is designed to be simple, intuitive, and easy to use.",
		year: "2025",
		status: "maintained",
		stack: ["Next.js", "Supabase", "Tailwind v4"],
		links: [
			{
				label: "source",
				href: "https://github.com/WickedSoftworks/evermind",
			},
			{
				label: "live",
				href: "https://evermind.shxrk.dev",
			},
		],
		body: `
<p>
Keeping on task and managing all my schoolwork and homework was difficult as a high school freshman. I'd never seen
so much work that I had to keep track of, and being a procrastinator, I needed a way to keep myself on track. 
I wanted to make a simple, beautiful, and easy-to-use online planner that would help me stay organized and never miss another deadline.
</p>
`.trim(),
	},
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

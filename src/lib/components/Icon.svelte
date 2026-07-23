<script lang="ts">
/**
 * Inline icon set — Lucide-style 24x24 strokes. Kept local so the site
 * ships zero icon-font or SVG-sprite dependencies.
 */
type Name =
	| "github"
	| "rss"
	| "mail"
	| "arrow-up-right"
	| "arrow-right"
	| "clock"
	| "cloud"
	| "music"
	| "activity"
	| "terminal"
	| "flame"
	| "close"
	| "layers";

let {
	name,
	size = 16,
	class: className = "",
}: { name: Name; size?: number; class?: string } = $props();

const paths: Record<Name, string> = {
	github:
		"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1.1-.8 1.7-.1.6-.1 1.2 0 1.8v4M9 18c-4.5 2-5-2-7-2",
	rss: "M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
	mail: "M22 7 13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
	"arrow-up-right": "M7 7h10v10M7 17 17 7",
	"arrow-right": "M5 12h14M12 5l7 7-7 7",
	clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
	cloud: "M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 16.7",
	music:
		"M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
	activity: "M22 12h-4l-3 9L9 3l-3 9H2",
	terminal: "m4 17 6-6-6-6M12 19h8",
	flame:
		"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z",
	close: "M18 6 6 18M6 6l12 12",
	layers:
		"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83ZM2 12.18l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9M2 17.18l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9",
};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.75"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	aria-hidden="true"
>
	<path d={paths[name]} />
</svg>

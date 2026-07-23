<script lang="ts">
import { goto, preloadData, pushState } from "$app/navigation";
import { page } from "$app/state";
import ProjectCard from "$lib/components/ProjectCard.svelte";
import ProjectModal from "$lib/components/ProjectModal.svelte";
import { site } from "$lib/config";
import { type Project, projects } from "$lib/data/projects";

const title = `Projects — ${site.domain}`;

/**
 * Open the project as a popout at /projects/{slug} without a full
 * navigation. Direct loads of that URL still render the standalone page —
 * same content, two presentations.
 */
async function select(event: MouseEvent, project: Project) {
	// Let the browser handle new-tab clicks, middle clicks and the like.
	if (event.button !== 0) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
	// Narrow screens get the real page — a modal there is just a worse page.
	if (window.matchMedia("(max-width: 639px)").matches) return;

	event.preventDefault();
	const href = `/projects/${project.slug}`;
	const result = await preloadData(href);

	if (result.type === "loaded" && result.status === 200) {
		pushState(href, { project: (result.data as { project: Project }).project });
	} else {
		await goto(href);
	}
}
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta
		name="description"
		content="Projects and experiments by {site.name} — {projects.length} of them, with write-ups."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
	<header class="border-b border-line pb-8">
		<p class="eyebrow">projects</p>
		<h1 class="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
			Projects &amp; experiments
		</h1>
		<p class="mt-4 max-w-xl text-base leading-relaxed text-muted">
			Side projects, tools and experiments. Click any card for the longer story —
			each one has its own page at
			<span class="font-mono text-sm text-frost">/projects/{"{name}"}</span>.
		</p>
	</header>

	<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project (project.slug)}
			<ProjectCard {project} onselect={(event) => select(event, project)} />
		{/each}
	</div>
</div>

{#if page.state.project}
	<ProjectModal project={page.state.project} close={() => history.back()} />
{/if}

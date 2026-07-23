<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { Project } from "$lib/data/projects";

let {
	project,
	onselect,
}: {
	project: Project;
	/** Set by the gallery to open the popout via shallow routing. */
	onselect?: (event: MouseEvent) => void;
} = $props();

const STATUS: Record<Project["status"], string> = {
	active: "text-aurora-green",
	maintained: "text-frost",
	experiment: "text-aurora-yellow",
	archived: "text-faint",
};
</script>

<a
	href="/projects/{project.slug}"
	onclick={onselect}
	class="card card-hover ticked group flex h-full flex-col"
>
	<div class="card-label">
		<span class="truncate normal-case text-dim group-hover:text-text">
			{project.name}
		</span>
		<span class="flex shrink-0 items-center gap-1.5 {STATUS[project.status]}">
			<span class="size-1.5 bg-current"></span>
			{project.status}
		</span>
	</div>

	<div class="card-body flex flex-1 flex-col">
		<p class="text-sm leading-relaxed text-muted">{project.summary}</p>

		<ul class="mt-4 flex flex-wrap gap-1.5">
			{#each project.stack.slice(0, 4) as tech (tech)}
				<li class="tag">{tech}</li>
			{/each}
		</ul>

		<div class="mt-auto flex items-center justify-between gap-3 pt-5">
			<span class="font-mono text-[0.6875rem] text-faint">{project.year}</span>
			<span
				class="flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted transition-colors group-hover:text-frost"
			>
				read more
				<Icon name="arrow-right" size={12} />
			</span>
		</div>
	</div>
</a>

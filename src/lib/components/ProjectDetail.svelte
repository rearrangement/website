<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { Project } from "$lib/data/projects";

let { project }: { project: Project } = $props();

const STATUS: Record<Project["status"], string> = {
	active: "text-aurora-green",
	maintained: "text-frost",
	experiment: "text-aurora-yellow",
	archived: "text-faint",
};
</script>

<article>
	<header class="border-b border-line pb-6">
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem]">
			<span class="flex items-center gap-1.5 {STATUS[project.status]}">
				<span class="size-1.5 bg-current"></span>
				{project.status}
			</span>
			<span class="text-faint">{project.year}</span>
		</div>

		<h1 class="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
			{project.name}
		</h1>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			{project.blurb}
		</p>
	</header>

	<div class="grid gap-6 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-start">
		<div>
			<p class="mb-2.5 font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
				built with
			</p>
			<ul class="flex flex-wrap gap-1.5">
				{#each project.stack as tech (tech)}
					<li class="tag">{tech}</li>
				{/each}
			</ul>
		</div>

		{#if project.links.length}
			<div>
				<p class="mb-2.5 font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
					links
				</p>
				<ul class="flex flex-wrap gap-2">
					{#each project.links as link (link.href)}
						<li>
							<a
								href={link.href}
								class="card card-hover flex items-center gap-2 px-3 py-1.5 font-mono text-xs text-dim hover:text-text"
							>
								{link.label}
								<Icon name="arrow-up-right" size={12} />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<div class="prose pt-8">
		{@html project.body}
	</div>
</article>

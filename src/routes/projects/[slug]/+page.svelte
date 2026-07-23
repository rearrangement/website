<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import ProjectDetail from "$lib/components/ProjectDetail.svelte";
import { site } from "$lib/config";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

const title = $derived(`${data.project.name} — ${site.domain}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={data.project.summary} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={data.project.summary} />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
	<a
		href="/projects"
		class="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-frost"
	>
		<Icon name="arrow-right" size={13} class="rotate-180" />
		all projects
	</a>

	<ProjectDetail project={data.project} />
</div>

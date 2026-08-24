<script lang="ts">
import ClockWeatherCard from "$lib/components/ClockWeatherCard.svelte";
import DiscordCard from "$lib/components/DiscordCard.svelte";
import GithubCard from "$lib/components/GithubCard.svelte";
import Hero from "$lib/components/Hero.svelte";
import Icon from "$lib/components/Icon.svelte";
import MusicCard from "$lib/components/MusicCard.svelte";
import ProjectCard from "$lib/components/ProjectCard.svelte";
import StackSection from "$lib/components/StackSection.svelte";
import WakatimeCard from "$lib/components/WakatimeCard.svelte";
import { site } from "$lib/config";
import { featuredProjects } from "$lib/data/projects";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{site.name}: {site.domain}</title>
	<meta property="og:title" content="{site.name}: {site.domain}" />
	<meta property="og:description" content={site.description} />
</svelte:head>

<Hero />

<section
	aria-labelledby="signals-heading"
	class="mx-auto max-w-5xl px-5 pt-20 sm:px-8"
>
	<div class="mb-6">
		<p class="eyebrow">signals</p>
		<h2 id="signals-heading" class="mt-3 text-2xl font-semibold tracking-tight text-text">
			What I'm up to, roughly live
		</h2>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">
			Pulled from Discord, GitHub, WakaTime, Last.fm and Open-Meteo. Nothing here is
			hand-written; if a service is down its card just says so.
		</p>
	</div>

	<div class="grid items-stretch gap-8 lg:grid-cols-2">
		<div class="flex min-w-0 flex-col justify-between gap-5 [&>*]:min-w-0">
			<GithubCard stats={data.github} />
			<MusicCard stats={data.music} />
		</div>
		<div class="flex min-w-0 flex-col justify-between gap-5 [&>*]:min-w-0">
			<DiscordCard />
			<WakatimeCard stats={data.wakatime} />
			<ClockWeatherCard weather={data.weather} />
		</div>
	</div>
</section>

<div class="mx-auto max-w-5xl space-y-24 px-5 pt-24 pb-20 sm:px-8">
	<StackSection />

	{#if featuredProjects.length}
		<section aria-labelledby="work-heading">
			<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p class="eyebrow">selected work</p>
					<h2 id="work-heading" class="mt-3 text-2xl font-semibold tracking-tight text-text">
						Things I've built
					</h2>
				</div>
				<a
					href="/projects"
					class="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-frost"
				>
					all projects
					<Icon name="arrow-right" size={13} />
				</a>
			</div>

			<div class="grid gap-5 sm:grid-cols-2">
				{#each featuredProjects as project (project.slug)}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>
	{/if}

	<section class="card ticked">
		<div class="card-label">
			<span class="flex items-center gap-2">
				<Icon name="mail" size={13} />
				contact
			</span>
		</div>
		<div class="card-body sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
			<div>
				<h2 class="text-lg font-semibold tracking-tight text-text">Say hello</h2>
				<p class="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
					Open to interesting problems, and happy to talk about anything on this page.
				</p>
			</div>
			<div class="mt-5 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
				<a href="mailto:{site.email}" class="btn btn-primary">
					{site.email}
				</a>
				<a href="/socials" class="btn btn-ghost">
					Socials
					<Icon name="arrow-right" size={14} />
				</a>
			</div>
		</div>
	</section>
</div>

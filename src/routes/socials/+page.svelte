<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { contact, profiles, site } from "$lib/config";

const title = `Socials — ${site.domain}`;

type Entry = (typeof contact)[number] | (typeof profiles)[number];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta
		name="description"
		content="Where to reach {site.name}, and where to find him elsewhere."
	/>
</svelte:head>

{#snippet card(entry: Entry)}
	<a
		href={entry.href}
		rel={entry.href.startsWith("http") ? "me noopener" : undefined}
		class="card card-hover ticked group flex h-full flex-col"
	>
		<div class="card-label">
			<span class="flex min-w-0 items-center gap-2 text-dim group-hover:text-text">
				<Icon name={entry.icon} size={14} class="shrink-0" />
				<span class="truncate">{entry.platform}</span>
			</span>
			<Icon
				name="arrow-up-right"
				size={12}
				class="shrink-0 text-faint transition-colors group-hover:text-frost"
			/>
		</div>

		<div class="card-body flex flex-1 flex-col">
			<p class="truncate font-mono text-sm text-frost">{entry.handle}</p>
			<p class="mt-3 text-sm leading-relaxed text-muted">{entry.note}</p>
		</div>
	</a>
{/snippet}

<div class="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
	<header class="border-b border-line pb-8">
		<p class="eyebrow">socials</p>
		<h1 class="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
			Where to find me
		</h1>
		<p class="mt-4 max-w-xl text-base leading-relaxed text-muted">
			Come and talk to me if you want to, or don't — up to you. Everything below is
			a public account; nothing here is a form that emails me.
		</p>
	</header>

	<section aria-labelledby="contact-heading" class="mt-12">
		<h2 id="contact-heading" class="text-2xl font-semibold tracking-tight text-text">
			Talk to me
		</h2>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">
			Roughly in order of how quickly you'll hear back.
		</p>

		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each contact as entry (entry.href)}
				{@render card(entry)}
			{/each}
		</div>
	</section>

	<section aria-labelledby="profiles-heading" class="mt-16">
		<h2 id="profiles-heading" class="text-2xl font-semibold tracking-tight text-text">
			Or just watch
		</h2>
		<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">
			Check what I'm doing without talking to me at all.
		</p>

		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each profiles as entry (entry.href)}
				{@render card(entry)}
			{/each}
		</div>
	</section>
</div>

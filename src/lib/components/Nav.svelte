<script lang="ts">
import { page } from "$app/state";
import Icon from "$lib/components/Icon.svelte";
import { site } from "$lib/config";

const links = [
	{ label: "index", href: "/" },
	{ label: "projects", href: "/projects" },
];

// /projects/foo should still light up the "projects" link.
function isActive(href: string): boolean {
	return href === "/"
		? page.url.pathname === "/"
		: page.url.pathname.startsWith(href);
}
</script>

<header
	class="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/65"
>
	<nav
		class="mx-auto flex h-14 max-w-5xl items-center justify-between gap-6 px-5 sm:px-8"
		aria-label="Main"
	>
		<a
			href="/"
			class="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-text"
		>
			<span class="text-frost">~/</span>
			<span>{site.handle}</span>
			<span class="cursor-blink text-frost" aria-hidden="true">▊</span>
		</a>

		<div class="flex items-center gap-1 sm:gap-2">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? "page" : undefined}
					class="relative px-2.5 py-1.5 font-mono text-[0.8125rem] transition-colors sm:px-3
						{isActive(link.href) ? 'text-text' : 'text-muted hover:text-dim'}"
				>
					{link.label}
					{#if isActive(link.href)}
						<span class="absolute inset-x-2.5 -bottom-px h-px bg-frost sm:inset-x-3"></span>
					{/if}
				</a>
			{/each}

			<a
				href={site.blog}
				class="flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[0.8125rem] text-muted transition-colors hover:text-dim sm:px-3"
			>
				blog
				<Icon name="arrow-up-right" size={12} />
			</a>
		</div>
	</nav>
</header>

<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { site, socials } from "$lib/config";

const year = new Date().getFullYear();
</script>

<footer class="mt-24 border-t border-line">
	<div
		class="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8"
	>
		<div class="space-y-1.5">
			<p class="font-mono text-sm text-dim">
				<span class="text-frost">~/</span>{site.handle}
			</p>
			<p class="font-mono text-xs text-faint">
				© {year} {site.name} · built with SvelteKit · Nord
			</p>
		</div>

		<ul class="flex flex-wrap items-center gap-2">
			{#each socials as social (social.href)}
				<li>
					<a
						href={social.href}
						class="card card-hover ticked flex items-center gap-2 px-3 py-2 font-mono text-xs text-muted hover:text-text"
						rel={social.href.startsWith("http") ? "me noopener" : undefined}
					>
						<Icon name={social.icon} size={14} />
						{social.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>

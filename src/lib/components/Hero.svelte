<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { handles, isSet, site, stack } from "$lib/config";

// A static "whoami" block — the live telemetry lives further down the page.
const facts = [
	{ key: "role", value: "software engineer" },
	{ key: "focus", value: stack[0].items.slice(0, 3).join(", ") },
	{ key: "writing", value: site.blog.replace("https://", "") },
	{ key: "reach", value: site.email },
];
</script>

<section class="relative isolate overflow-hidden border-b border-line">
	<div class="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
	<div
		class="bloom pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
		<div class="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
			<div>
				<p class="eyebrow">
					{isSet(handles.discordUserId) ? "available · say hi" : "personal site"}
				</p>

				<h1 class="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
					Hey, I'm <span class="text-gradient">{site.name}</span>.<br />
					I build small,<br class="hidden sm:block" /> sharp software.
				</h1>

				<p class="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
					{site.tagline} This page is half portfolio, half status board — scroll for
					live signals from the things I actually use.
				</p>

				<div class="mt-9 flex flex-wrap items-center gap-3">
					<a href="/projects" class="btn btn-primary">
						View projects
						<Icon name="arrow-right" size={14} />
					</a>
					<a href={site.blog} class="btn btn-ghost">
						Read the blog
						<Icon name="arrow-up-right" size={14} />
					</a>
				</div>
			</div>

			<div class="card ticked lg:justify-self-end lg:w-full">
				<div class="card-label">
					<span class="flex items-center gap-2">
						<Icon name="terminal" size={13} />
						whoami
					</span>
					<span class="flex gap-1.5" aria-hidden="true">
						<span class="size-2 bg-aurora-red"></span>
						<span class="size-2 bg-aurora-yellow"></span>
						<span class="size-2 bg-aurora-green"></span>
					</span>
				</div>

				<div class="card-body font-mono text-[0.8125rem]">
					<p class="text-muted">
						<span class="text-frost">$</span> whoami --verbose
					</p>
					<dl class="mt-3 space-y-2">
						{#each facts as fact (fact.key)}
							<div class="flex gap-3">
								<dt class="w-16 shrink-0 text-faint">{fact.key}</dt>
								<dd class="min-w-0 truncate text-dim">{fact.value}</dd>
							</div>
						{/each}
					</dl>
					<p class="mt-4 text-muted">
						<span class="text-frost">$</span>
						<span class="cursor-blink" aria-hidden="true">▊</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

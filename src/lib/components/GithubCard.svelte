<script lang="ts">
import ContributionGraph from "$lib/components/ContributionGraph.svelte";
import Icon from "$lib/components/Icon.svelte";
import { handles } from "$lib/config";
import type { GithubStats } from "$lib/server/github";

let { stats }: { stats: GithubStats | null } = $props();

/** Nord aurora ramp, cycled across the language bar. */
const LANG_COLORS = [
	"var(--color-frost)",
	"var(--color-aurora-purple)",
	"var(--color-aurora-green)",
	"var(--color-aurora-yellow)",
	"var(--color-aurora-orange)",
	"var(--color-frost-deep)",
];

const nf = new Intl.NumberFormat("en-US");
</script>

<section class="card ticked">
	<div class="card-label">
		<span class="flex items-center gap-2">
			<Icon name="github" size={13} />
			github
		</span>
		{#if stats}
			<a
				href="https://github.com/{handles.github}"
				class="flex items-center gap-1 normal-case hover:text-frost"
			>
				@{handles.github}
				<Icon name="arrow-up-right" size={11} />
			</a>
		{/if}
	</div>

	<div class="card-body">
		{#if !stats}
			<p class="font-mono text-xs leading-relaxed text-faint">
				Set <span class="text-frost">handles.github</span> in
				<span class="text-dim">src/lib/config.ts</span> to pull contributions and languages.
			</p>
		{:else}
			<dl class="mb-5 grid grid-cols-3 divide-x divide-line border border-line">
				{#each [{ k: "commits · 1y", v: stats.total }, { k: "repos", v: stats.repos }, { k: "stars", v: stats.stars }] as stat (stat.k)}
					<div class="px-3 py-2.5">
						<dd class="font-mono text-lg leading-tight text-text tabular-nums">
							{nf.format(stat.v)}
						</dd>
						<dt class="mt-0.5 font-mono text-[0.625rem] tracking-wider text-faint uppercase">
							{stat.k}
						</dt>
					</div>
				{/each}
			</dl>

			<ContributionGraph days={stats.days} />

			{#if stats.languages.length}
				<div class="mt-6 border-t border-line pt-4">
					<p class="mb-3 font-mono text-[0.625rem] tracking-[0.14em] text-faint uppercase">
						top languages
					</p>

					<div class="flex h-1.5 w-full overflow-hidden">
						{#each stats.languages as lang, i (lang.name)}
							<span
								style:width="{lang.percent}%"
								style:background-color={LANG_COLORS[i % LANG_COLORS.length]}
								title="{lang.name} {lang.percent}%"
							></span>
						{/each}
					</div>

					<ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
						{#each stats.languages as lang, i (lang.name)}
							<li class="flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted">
								<span
									class="size-2"
									style:background-color={LANG_COLORS[i % LANG_COLORS.length]}
								></span>
								{lang.name}
								<span class="text-faint">{lang.percent}%</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}
	</div>
</section>

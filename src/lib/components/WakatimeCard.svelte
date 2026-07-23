<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { WakaStats } from "$lib/server/wakatime";

let { stats }: { stats: WakaStats | null } = $props();
</script>

<section class="card ticked">
	<div class="card-label">
		<span class="flex items-center gap-2">
			<Icon name="clock" size={13} />
			wakatime
		</span>
		{#if stats}
			<span class="normal-case">{stats.range}</span>
		{/if}
	</div>

	<div class="card-body">
		{#if !stats}
			<p class="font-mono text-xs leading-relaxed text-faint">
				Set <span class="text-frost">handles.wakatime</span> in
				<span class="text-dim">src/lib/config.ts</span>, and turn on public coding activity
				in your WakaTime settings.
			</p>
		{:else}
			<div class="grid grid-cols-2 divide-x divide-line border border-line">
				<div class="px-3 py-2.5">
					<p class="font-mono text-base leading-tight text-text">{stats.total}</p>
					<p class="mt-0.5 font-mono text-[0.625rem] tracking-wider text-faint uppercase">
						past 7 days
					</p>
				</div>
				<div class="px-3 py-2.5">
					<p class="font-mono text-base leading-tight text-text">{stats.dailyAverage}</p>
					<p class="mt-0.5 font-mono text-[0.625rem] tracking-wider text-faint uppercase">
						daily average
					</p>
				</div>
			</div>

			{#if stats.languages.length}
				<ul class="mt-5 space-y-2.5">
					{#each stats.languages as lang (lang.name)}
						<li>
							<div class="flex items-baseline justify-between gap-3 font-mono text-xs">
								<span class="truncate text-dim">{lang.name}</span>
								<span class="shrink-0 text-faint tabular-nums">{lang.text}</span>
							</div>
							<div class="mt-1.5 h-1 w-full bg-surface-2">
								<div class="h-full bg-frost-deep" style:width="{lang.percent}%"></div>
							</div>
						</li>
					{/each}
				</ul>
			{/if}

			{#if stats.projects.length}
				<div class="mt-5 border-t border-line pt-4">
					<p class="mb-3 font-mono text-[0.625rem] tracking-[0.14em] text-faint uppercase">
						projects
					</p>
					<ul class="space-y-2.5">
						{#each stats.projects as project (project.name)}
							<li>
								<div class="flex items-baseline justify-between gap-3 font-mono text-xs">
									<span class="truncate text-dim">{project.name}</span>
									<span class="shrink-0 text-faint tabular-nums">{project.text}</span>
								</div>
								<div class="mt-1.5 h-1 w-full bg-surface-2">
									<div class="h-full bg-frost" style:width="{project.percent}%"></div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if stats.editors.length}
				<div class="mt-5 border-t border-line pt-4">
					<p class="mb-2 font-mono text-[0.625rem] tracking-[0.14em] text-faint uppercase">
						editors
					</p>
					<ul class="flex flex-wrap gap-1.5">
						{#each stats.editors as editor (editor.name)}
							<li class="tag">{editor.name} · {editor.percent}%</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/if}
	</div>
</section>

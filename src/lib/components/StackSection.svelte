<script lang="ts">
import { stack } from "$lib/config";
</script>

<section aria-labelledby="stack-heading">
	<div class="mb-6">
		<p class="eyebrow">stack</p>
		<h2 id="stack-heading" class="mt-3 text-2xl font-semibold tracking-tight text-text">
			What I reach for
		</h2>
	</div>

	<div class="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
		{#each stack as column (column.group)}
			<div class="bg-surface p-5">
				<p class="font-mono text-[0.625rem] tracking-[0.16em] text-frost uppercase">
					{column.group}
				</p>
				<ul class="mt-3.5 space-y-1.5">
					{#each column.items as item (item)}
						<li class="flex items-center gap-2 font-mono text-[0.8125rem] text-dim">
							<span class="size-1 shrink-0 bg-steel"></span>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

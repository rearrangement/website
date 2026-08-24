<script lang="ts">
import type { ContributionDay } from "$lib/server/github";

let { days }: { days: ContributionDay[] } = $props();

/** Level 0–4 mapped onto the frost ramp. Squares, naturally. */
const LEVELS = [
	"var(--color-surface-2)",
	"color-mix(in srgb, var(--color-frost) 24%, var(--color-bg-deep))",
	"color-mix(in srgb, var(--color-frost) 46%, var(--color-bg-deep))",
	"color-mix(in srgb, var(--color-frost) 72%, var(--color-bg-deep))",
	"var(--color-frost)",
];

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const weeks = $derived.by(() => {
	if (!days.length) return [];
	const out: (ContributionDay | null)[][] = [];
	let column: (ContributionDay | null)[] = [];

	const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
	for (let i = 0; i < offset; i++) column.push(null);

	for (const day of days) {
		column.push(day);
		if (column.length === 7) {
			out.push(column);
			column = [];
		}
	}
	if (column.length) {
		while (column.length < 7) column.push(null);
		out.push(column);
	}
	return out;
});

// A month label sits above the first column in which that month appears.
const monthLabels = $derived.by(() => {
	const seen = new Set<number>();
	return weeks.map((week) => {
		const first = week.find((d) => d !== null);
		if (!first) return "";
		const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
		if (seen.has(month)) return "";
		seen.add(month);
		return MONTHS[month];
	});
});

function label(day: ContributionDay): string {
	const n = day.count;
	return `${n} contribution${n === 1 ? "" : "s"} on ${day.date}`;
}
</script>

<div class="overflow-x-auto pb-1">
	<div class="inline-flex min-w-full flex-col gap-1">
		<div class="flex gap-[3px]">
			{#each monthLabels as month, i (i)}
				<span class="w-[11px] shrink-0 font-mono text-[0.5625rem] text-faint">
					{month}
				</span>
			{/each}
		</div>

		<div class="flex gap-[3px]" role="img" aria-label="Contribution activity over the past year">
			{#each weeks as week, w (w)}
				<div class="flex shrink-0 flex-col gap-[3px]">
					{#each week as day, d (d)}
						{#if day}
							<span
								class="size-[11px] border border-black/10"
								style:background-color={LEVELS[day.level]}
								title={label(day)}
							></span>
						{:else}
							<span class="size-[11px]"></span>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="mt-3 flex items-center justify-end gap-1.5 font-mono text-[0.625rem] text-faint">
	<span>less</span>
	{#each LEVELS as level, i (i)}
		<span class="size-[11px] border border-black/10" style:background-color={level}></span>
	{/each}
	<span>more</span>
</div>

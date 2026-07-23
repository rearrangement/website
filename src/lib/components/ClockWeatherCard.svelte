<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { isSet, location } from "$lib/config";
import type { Weather } from "$lib/server/weather";

let { weather }: { weather: Weather | null } = $props();

// The clock only renders after mount — a server-rendered timestamp would
// disagree with the client's by a second and trip hydration.
let now = $state<Date | null>(null);

$effect(() => {
	now = new Date();
	const id = setInterval(() => {
		now = new Date();
	}, 1000);
	return () => clearInterval(id);
});

const time = new Intl.DateTimeFormat("en-GB", {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
	timeZone: location.timezone,
});

const date = new Intl.DateTimeFormat("en-GB", {
	weekday: "short",
	day: "2-digit",
	month: "short",
	timeZone: location.timezone,
});

/** Offset like "UTC−04:00" for the configured zone, computed from the parts. */
const offset = $derived.by(() => {
	if (!now) return "";
	const label = new Intl.DateTimeFormat("en-US", {
		timeZone: location.timezone,
		timeZoneName: "shortOffset",
	})
		.formatToParts(now)
		.find((p) => p.type === "timeZoneName");
	return label?.value ?? "";
});
</script>

<section class="card ticked">
	<div class="card-label">
		<span class="flex items-center gap-2">
			<Icon name="clock" size={13} />
			local
		</span>
		{#if offset}
			<span class="normal-case">{offset}</span>
		{/if}
	</div>

	<div class="card-body">
		<p class="font-mono text-3xl leading-none text-text tabular-nums">
			{now ? time.format(now) : "--:--:--"}
		</p>
		<p class="mt-2 font-mono text-xs text-muted">
			{now ? date.format(now) : " "}
			{#if isSet(location.label)}
				<span class="text-faint">· {location.label}</span>
			{/if}
		</p>

		<div class="mt-5 flex items-center gap-3 border-t border-line pt-4">
			{#if weather}
				<Icon name="cloud" size={22} class="shrink-0 text-frost-deep" />
				<div class="min-w-0">
					<p class="font-mono text-sm text-text tabular-nums">
						{weather.temperature}°C
						<span class="text-faint">· feels {weather.feelsLike}°</span>
					</p>
					<p class="truncate font-mono text-xs text-muted">{weather.description}</p>
				</div>
			{:else}
				<p class="font-mono text-xs text-faint">weather unavailable</p>
			{/if}
		</div>
	</div>
</section>

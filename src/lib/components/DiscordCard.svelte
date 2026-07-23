<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { handles, isSet } from "$lib/config";
import { activityImage, formatElapsed, Lanyard } from "$lib/lanyard.svelte";

const configured = isSet(handles.discordUserId);
const lanyard = new Lanyard(handles.discordUserId);

$effect(() => {
	if (!configured) return;
	lanyard.start();
	return () => lanyard.stop();
});

const STATUS: Record<string, { label: string; class: string }> = {
	online: { label: "online", class: "bg-aurora-green" },
	idle: { label: "idle", class: "bg-aurora-yellow" },
	dnd: { label: "do not disturb", class: "bg-aurora-red" },
	offline: { label: "offline", class: "bg-faint" },
};

const presence = $derived(lanyard.presence);
const status = $derived(STATUS[presence?.discord_status ?? "offline"]);
const spotify = $derived(presence?.spotify ?? null);
const activity = $derived(lanyard.activity);
const custom = $derived(lanyard.customStatus);

const progress = $derived.by(() => {
	if (!spotify) return 0;
	const { start, end } = spotify.timestamps;
	const span = end - start;
	if (span <= 0) return 0;
	return Math.min(100, Math.max(0, ((lanyard.now - start) / span) * 100));
});
</script>

<section class="card ticked">
	<div class="card-label">
		<span class="flex items-center gap-2">
			<Icon name="activity" size={13} />
			presence
		</span>
		{#if lanyard.connected}
			<span class="flex items-center gap-1.5 text-aurora-green">
				<span class="pulse-dot inline-block size-1.5 bg-aurora-green"></span>
				live
			</span>
		{:else}
			<span class="text-faint">offline</span>
		{/if}
	</div>

	<div class="card-body space-y-4">
		{#if !configured}
			<p class="font-mono text-xs leading-relaxed text-faint">
				Set <span class="text-frost">handles.discordUserId</span> in
				<span class="text-dim">src/lib/config.ts</span> to enable live Discord presence.
			</p>
		{:else if !presence}
			<div class="space-y-2" aria-busy="true">
				<div class="h-10 w-10 animate-pulse bg-surface-2"></div>
				<div class="h-3 w-2/3 animate-pulse bg-surface-2"></div>
				<div class="h-3 w-1/3 animate-pulse bg-surface-2"></div>
			</div>
		{:else}
			<div class="flex items-center gap-3">
				<div class="relative shrink-0">
					{#if lanyard.avatarUrl}
						<img
							src={lanyard.avatarUrl}
							alt=""
							width="44"
							height="44"
							class="size-11 border border-line object-cover"
						/>
					{:else}
						<div class="grid size-11 place-items-center border border-line bg-bg-deep">
							<Icon name="terminal" size={16} class="text-muted" />
						</div>
					{/if}
					<span
						class="absolute -right-1 -bottom-1 size-3 border-2 border-surface {status.class}"
						title={status.label}
					></span>
				</div>

				<div class="min-w-0">
					<p class="truncate font-mono text-sm text-text">
						{presence.discord_user.display_name ??
							presence.discord_user.global_name ??
							presence.discord_user.username}
					</p>
					<p class="truncate font-mono text-xs text-muted">
						{#if custom}
							{custom.emoji?.name ?? ""}
							{custom.state ?? status.label}
						{:else}
							{status.label}
						{/if}
					</p>
				</div>
			</div>

			{#if spotify}
				{@const art = spotify.album_art_url}
				<div class="border border-line bg-bg-deep p-3">
					<div class="flex items-center gap-3">
						<img
							src={art}
							alt=""
							width="48"
							height="48"
							class="size-12 shrink-0 border border-line object-cover"
						/>
						<div class="min-w-0 flex-1">
							<p class="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-aurora-green uppercase">
								<Icon name="music" size={10} />
								now playing
							</p>
							<p class="mt-1 truncate text-sm text-text">{spotify.song}</p>
							<p class="truncate font-mono text-xs text-muted">{spotify.artist}</p>
						</div>
					</div>
					<div class="mt-3 h-0.5 w-full bg-line">
						<div
							class="h-full bg-aurora-green transition-[width] duration-1000 ease-linear"
							style:width="{progress}%"
						></div>
					</div>
				</div>
			{/if}

			{#if activity}
				{@const img = activityImage(activity)}
				<div class="flex items-center gap-3 border border-line bg-bg-deep p-3">
					{#if img}
						<img
							src={img}
							alt=""
							width="40"
							height="40"
							class="size-10 shrink-0 border border-line object-cover"
						/>
					{:else}
						<div class="grid size-10 shrink-0 place-items-center border border-line">
							<Icon name="terminal" size={14} class="text-muted" />
						</div>
					{/if}
					<div class="min-w-0 flex-1">
						<p class="truncate font-mono text-xs text-frost">{activity.name}</p>
						{#if activity.details}
							<p class="truncate text-xs text-dim">{activity.details}</p>
						{/if}
						{#if activity.state}
							<p class="truncate text-xs text-muted">{activity.state}</p>
						{/if}
					</div>
					{#if activity.timestamps?.start}
						<span class="shrink-0 self-start font-mono text-[0.625rem] text-faint tabular-nums">
							{formatElapsed(activity.timestamps.start, lanyard.now)}
						</span>
					{/if}
				</div>
			{/if}

			{#if !spotify && !activity}
				<p class="font-mono text-xs text-faint">no activity</p>
			{/if}
		{/if}
	</div>
</section>

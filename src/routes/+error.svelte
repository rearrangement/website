<script lang="ts">
import { page } from "$app/state";
import Icon from "$lib/components/Icon.svelte";
</script>

<svelte:head>
	<title>{page.status} not found</title>
</svelte:head>

<div class="mx-auto flex max-w-5xl flex-col items-start px-5 py-28 sm:px-8">
	<div class="card ticked w-full max-w-lg">
		<div class="card-label">
			<span class="flex items-center gap-2">
				<Icon name="terminal" size={13} />
				error
			</span>
			<span class="text-aurora-red">{page.status}</span>
		</div>
		<div class="card-body font-mono text-sm">
			<p class="text-muted">
				<span class="text-frost">$</span> cat {page.url.pathname}
			</p>
			<p class="mt-3 text-aurora-red">
				{page.error?.message ?? "Something went wrong."}
			</p>
			<a
				href="/"
				class="mt-6 inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-frost"
			>
				<Icon name="arrow-right" size={13} class="rotate-180" />
				back home
			</a>
		</div>
	</div>
</div>

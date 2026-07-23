<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import ProjectDetail from "$lib/components/ProjectDetail.svelte";
import type { Project } from "$lib/data/projects";

let { project, close }: { project: Project; close: () => void } = $props();

let dialog = $state<HTMLDialogElement | null>(null);

// showModal() gives us focus trapping, inertness and Esc handling for free.
$effect(() => {
	dialog?.showModal();
});
</script>

<dialog
	bind:this={dialog}
	onclose={close}
	onclick={(event) => {
		// Clicks land on the dialog itself only when they hit the backdrop.
		if (event.target === dialog) dialog?.close();
	}}
	aria-label={project.name}
>
	<div class="card flex max-h-[85vh] w-full flex-col">
		<div class="card-label sticky top-0 z-10 bg-surface">
			<span class="truncate normal-case text-dim">/projects/{project.slug}</span>
			<button
				type="button"
				onclick={() => dialog?.close()}
				class="-mr-1 p-1 text-muted transition-colors hover:text-text"
				aria-label="Close"
			>
				<Icon name="close" size={15} />
			</button>
		</div>

		<div class="overflow-y-auto px-5 py-6 sm:px-8">
			<ProjectDetail {project} />
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: min(46rem, calc(100vw - 2rem));
		max-height: 85vh;
		padding: 0;
		border: 0;
		margin: auto;
		background: transparent;
		color: inherit;
		overflow: visible;
	}

	dialog::backdrop {
		background-color: rgb(23 27 34 / 0.72);
		backdrop-filter: blur(3px);
	}

	dialog[open] {
		animation: pop 160ms ease-out;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}
</style>

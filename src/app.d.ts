import type { Project } from "$lib/data/projects";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		/** Set by the projects gallery when opening a project as a shallow-routed popout. */
		interface PageState {
			project?: Project;
		}
	}
}

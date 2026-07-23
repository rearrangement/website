<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import Footer from "$lib/components/Footer.svelte";
import Nav from "$lib/components/Nav.svelte";
import { site } from "$lib/config";

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={site.description} />
	<meta property="og:site_name" content={site.domain} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

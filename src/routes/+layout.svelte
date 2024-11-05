<script>
  import '../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Services from '$lib/ui/organisms/services.organism.svelte';
</script>

<svelte:head>
  <title>AuraMarket</title>
</svelte:head>

<Header />

<main class="max-w-screen-lg my-0 mx-auto">
  <slot />

  <Services />
</main>

<div class="py-4"></div>

<Footer />

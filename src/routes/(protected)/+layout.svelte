<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/publicHeader.svelte';
  import { userStore } from '$lib/stores/user.store';

  export let data;
  $userStore = data.user;
</script>

<svelte:head>
  <title>AuraMarket</title>
</svelte:head>

<Header />

<main class="max-w-screen-lg my-0 mx-auto">
  <slot />
</main>

<div class="py-4"></div>

<Footer />

<script lang="ts">
  import '../app.css';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { checkRole } from '$lib/rbacUtils';
  import { ROLES } from '../constants';
  import { userStore, cartStore, productsStore } from '../stores';
  import type { UserEntity } from '../stores';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Loading from '$lib/components/loading.svelte';

  export let data: { user: UserEntity };

  $: isAdminPageOrHomePage = $page.url.pathname === '/admin' || $page.url.pathname === '/';
  let loading = isAdminPageOrHomePage;

  const fetchData = async () => {
    try {
      const data = await fetch('https://api.escuelajs.co/api/v1/products').then((res) => res.json());

      const firstFourProducts = data.slice(0, 4);

      $productsStore = firstFourProducts;
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  };

  function goToLogin() {
    if ($userStore) {
      document.cookie = 'access_token=;';
      $userStore = null;
    }

    goto('/login');
  }

  $: {
    if (isAdminPageOrHomePage && !$productsStore.length) {
      loading = true;
      fetchData();
    }
  }
  $: $userStore = data.user;
  $: isAdmin = $userStore && checkRole($userStore, ROLES.ADMIN);
  $: isCustomer = $userStore && checkRole($userStore, ROLES.CUSTOMER);
</script>

<svelte:head>
  <title>AuraMarket</title>
</svelte:head>

<!-- 
<header class="bg-gray-900 text-white py-4 px-6 md:px-12 flex items-center justify-between">
  <a class="text-2xl font-bold" href="/">Aura Market</a>
  <nav class="hidden md:flex items-center space-x-6">
    {#if isAdmin}
      <a class="hover:text-gray-300" href="/admin">Admin</a>
    {/if}
    {#if isCustomer}
      <a class="hover:text-gray-300" href="/user">Profile</a>
    {/if}
  </nav>
  <div class="flex items-center space-x-4">
    <button class="hover:text-gray-300" on:click={goToLogin}>{$userStore ? 'Sign out' : 'Sign in'}</button>
    <a class="hover:text-gray-300" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </a>
    <div class="relative">
      <a class="hover:text-gray-300" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      </a>
      {#if $cartStore.length > 0}
        <div class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
          {$cartStore.length}
        </div>
      {/if}
    </div>
  </div>
</header>
 -->

<Header />

<main class="max-w-screen-lg my-0 mx-auto">
  {#if loading}
    <Loading />
  {:else}
    <slot />
  {/if}
</main>

<Footer />

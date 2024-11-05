<script>
  import { goto } from '$app/navigation';
  import { checkRole } from '$lib/rbacUtils';
  import { userStore } from '$lib/stores/user.store';
  import { ROLES } from '../../constants';
  import Dropdown from './dropdown.svelte';
  import SearchProduct from './searchProduct.svelte';
  import SideBarManu from './sideBarMenu.svelte';

  const dropdownContent = [
    { to: '/product/category/clothes', name: 'Clothes' },
    { to: '/product/category/shoes', name: 'Shoes' },
    { to: '/product/category/miscellaneous', name: 'Miscellaneous' },
    { to: '/product/category/electronics', name: 'Electronics' },
  ];

  const signOut = () => {
    document.cookie = 'access_token=;';
    $userStore = null;
    goto('/');
  };

  $: isAdmin = $userStore && checkRole($userStore, ROLES.ADMIN);
  $: isCustomer = $userStore && checkRole($userStore, ROLES.CUSTOMER);
</script>

<header
  class="relative z-10 flex gap-2 md:gap-4 place-items-center py-2 px-4 md:py-4 md:px-6 sticky top-0 bg-white justify-between w-full"
>
  <div class="md:hidden">
    <SideBarManu />
  </div>

  <img src="/favicon.svg" alt="favicon icon" class="hidden md:block size-8" />

  <nav class="hidden md:flex space-x-4 gap-2">
    <Dropdown name="Categories" content={dropdownContent} />
    <a href="/#deals" class="font-medium text-xs text-gray-700 hover:text-gray-900">Deals</a>
  </nav>

  <SearchProduct />

  <ul class="hidden md:flex space-x-4 gap-4">
    {#if $userStore}
      {#if isAdmin}
        <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/admin/dashboard"
          ><img src="/icons/window.svg" class={`w-4`} alt="Dashboard icon" />Dashboard</a
        >
      {/if}

      {#if isCustomer}
        <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/account"
          ><img src="/icons/user.svg" class={`w-4`} alt="Account icon" />Account</a
        >
      {/if}

      <button on:click={signOut} class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900"
        ><img src="/icons/sign-out.svg" class={`w-4`} alt="Sig Out icon" />Sign Out</button
      >
    {:else}
      <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/login"
        ><img src="/icons/sign-in.svg" class={`w-4`} alt="Sig in icon" />Sign in</a
      >
    {/if}

    <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/cart"
      ><img src="/icons/shopping-cart.svg" class={`w-4 stroke-blue-400`} alt="Cart icon" />Cart</a
    >
  </ul>
</header>

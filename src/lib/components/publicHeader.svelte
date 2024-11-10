<script>
  import { goto } from '$app/navigation';
  import { checkRole } from '$lib/rbacUtils';
  import { cartStore } from '$lib/stores/cart.store';
  import { favoriteStore } from '$lib/stores/favorites.store';
  import { userStore } from '$lib/stores/user.store';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { ROLES } from '../../constants';
  import Dropdown from './dropdown.svelte';
  import SearchProduct from './searchProduct.svelte';
  import SideBarManu from './publicSideBarMenu.svelte';

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
  class="z-10 flex gap-2 md:gap-4 place-items-center py-2 px-4 md:py-4 md:px-6 sticky top-0 bg-white justify-between w-full"
>
  <div class="md:hidden">
    <SideBarManu />
  </div>

  <img src="/favicon.svg" alt="favicon icon" class="hidden md:block size-8" />

  <nav class="hidden md:flex space-x-4 gap-2">
    <Dropdown name="Categories" content={dropdownContent} />
    <a href="/#deals" class="flex gap-1 items-center font-medium text-xs text-gray-700 group hover:text-gray-900"
      ><Icon name="sparkles" class="transition-colors fill-none stroke-gray-900 group-hover:stroke-gray-950" />Deals</a
    >
  </nav>

  <SearchProduct />

  <ul class="hidden md:flex space-x-4 gap-4">
    {#if $userStore}
      {#if isAdmin}
        <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/admin"
          ><Icon name="window" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />
          Dashboard</a
        >
      {/if}

      {#if isCustomer}
        <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/account"
          ><Icon
            name="user"
            class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950"
          />Account</a
        >
      {/if}

      <button
        on:click={signOut}
        class="text-nowrap font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900"
        ><Icon name="sign-out" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />Sign
        Out</button
      >
    {:else}
      <a class="text-nowrap font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/login"
        ><Icon name="sign-in" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />Sign
        in</a
      >
    {/if}

    <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/favorite">
      <span class="relative">
        <Icon name="heart-outline" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />
        {#if $favoriteStore.length}
          <div class="absolute font-bold -top-[5px] -left-[5px] bg-red-500 rounded-full px-1 text-white text-[.5rem]">
            {$favoriteStore.length}
          </div>
        {/if}
      </span>
      Favorite
    </a>

    <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/cart">
      <span class="relative">
        <Icon name="shopping-bag" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />
        {#if $cartStore.length}
          <div class="absolute font-bold -top-[5px] -left-[5px] bg-red-500 rounded-full px-1 text-white text-[.5rem]">
            {$cartStore.length}
          </div>
        {/if}
      </span>
      Cart</a
    >
  </ul>
</header>

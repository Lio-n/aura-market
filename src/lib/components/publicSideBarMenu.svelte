<script lang="ts">
  import { onMount } from 'svelte';
  import DropdownVertical from './dropdownVertical.svelte';
  import { favoriteStore } from '$lib/stores/favorites.store';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { cartStore } from '$lib/stores/cart.store';
  import { userStore } from '$lib/stores/user.store';
  import { checkRole } from '$lib/rbacUtils';
  import { ROLES } from '../../constants';
  import { goto } from '$app/navigation';
  import ButtonSignOut from '$lib/ui/atoms/buttonSignOut.svelte';

  let showContent = false;
  let sideMenuRef: HTMLDivElement | undefined;

  const showSideMenu = () => (showContent = !showContent);

  const handleClickOutside = (event: MouseEvent) => {
    if (showContent && sideMenuRef && !sideMenuRef.contains(event.target as Node)) {
      showContent = false;
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const dropdownContent = [
    { to: '/product/category/Clothes', name: 'Clothes' },
    { to: '/product/category/Shoes', name: 'Shoes' },
    { to: '/product/category/Miscellaneous', name: 'Miscellaneous' },
    { to: '/product/category/Electronics', name: 'Electronics' },
  ];

  $: isAdmin = $userStore && checkRole($userStore, ROLES.ADMIN);
  $: isCustomer = $userStore && checkRole($userStore, ROLES.CUSTOMER);
</script>

<div>
  <Icon
    name="burger"
    class="transition-colors stroke-gray-950 stroke-2 md:hidden cursor-pointer"
    on:click={showSideMenu}
  />

  {#if showContent}
    <div
      bind:this={sideMenuRef}
      class="p-4 min-w-48 bg-white left-0 top-0 bottom-0 h-screen shadow md:hidden fixed z-10"
    >
      <Icon
        name="arrow-left"
        class="stroke-gray-950 bg-white p-1 shadow absolute size-6 stroke-2 right-[-10px] top-4 rounded-md cursor-pointer"
        on:click={showSideMenu}
      />

      <div>
        <p class="font-semibold text-xl h-fit mb-8">AuraMarket</p>

        <p class="font-semibold text-xs mb-2">Navigation</p>

        {#if $userStore}
          {#if isAdmin}
            <a
              class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
              href="/admin/dashboard"
              ><Icon name="window" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />
              Dashboard</a
            >
          {/if}

          {#if isCustomer}
            <a
              class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
              href="/account"
              ><Icon
                name="user"
                class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950"
              />Account</a
            >
          {/if}

          <ButtonSignOut />
        {:else}
          <a
            class="w-full font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
            href="/login"
            ><Icon
              name="sign-in"
              class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950"
            />Sign in</a
          >
        {/if}

        <a
          class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
          href="/favorite"
        >
          <span class="relative">
            <Icon
              name="heart-outline"
              class="transition-colors fill-none stroke-gray-700 stroke-2 hover:stroke-gray-900 group"
            />
            {#if $favoriteStore.length}
              <div
                class="absolute font-bold -top-[5px] -left-[5px] bg-red-500 rounded-full px-1 text-white text-[.5rem]"
              >
                {$favoriteStore.length}
              </div>
            {/if}
          </span>
          Favorite
        </a>

        <a
          class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
          href="/cart"
        >
          <span class="relative">
            <Icon
              name="shopping-bag"
              class="transition-colors fill-none stroke-gray-700 stroke-2 hover:stroke-gray-950"
            />
            {#if $cartStore.totalQuantity}
              <div
                class="absolute font-bold -top-[5px] -left-[5px] bg-red-500 rounded-full px-1 text-white text-[.5rem]"
              >
                {$cartStore.totalQuantity}
              </div>
            {/if}
          </span>
          Cart</a
        >

        <DropdownVertical name="Categories" content={dropdownContent} addTagIcon />
        <a
          href="/#deals"
          class="p-2 font-medium text-xs flex gap-1 items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          ><Icon name="sparkles" class="transition-colors fill-none stroke-gray-900 hover:stroke-gray-950" />Deals</a
        >
      </div>
    </div>
  {/if}
</div>

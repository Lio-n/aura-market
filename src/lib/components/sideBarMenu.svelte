<script lang="ts">
  import { onMount } from 'svelte';
  import DropdownVertical from './dropdownVertical.svelte';

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
    { to: '/product/category/clothes', name: 'Clothes' },
    { to: '/product/category/shoes', name: 'Shoes' },
    { to: '/product/category/miscellaneous', name: 'Miscellaneous' },
    { to: '/product/category/electronics', name: 'Electronics' },
  ];
</script>

<div>
  <img
    src="/icons/burger.svg"
    alt="menu-icon"
    aria-hidden="true"
    on:click={showSideMenu}
    class="md:hidden cursor-pointer w-6"
  />

  {#if showContent}
    <div
      bind:this={sideMenuRef}
      class="p-4 min-w-48 bg-white left-0 top-0 bottom-0 h-screen shadow md:hidden fixed z-10"
    >
      <img
        src="/icons/arrow-left.svg"
        class="bg-white p-0.5 shadow w-6 absolute right-[-10px] top-4 rounded-full cursor-pointer"
        alt="arrow-circle-icon"
        aria-hidden="true"
        on:click={showSideMenu}
      />

      <div>
        <p class="font-semibold text-xl h-fit mb-8">AuraMarket</p>

        <p class="font-semibold text-xs mb-2">Navigation</p>

        <a
          class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
          href="/account"><img src="/icons/user.svg" class={`w-4`} alt="user icon" />Account</a
        >
        <a
          class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2"
          href="/cart"><img src="/icons/shopping-cart.svg" class={`w-4`} alt="user icon" />Cart</a
        >

        <DropdownVertical name="Categories" content={dropdownContent} addTagIcon />
        <a
          href="/#deals"
          class="p-2 font-medium text-xs flex gap-1 items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          ><img src="/icons/sparkles.svg" class={`w-4`} alt="user icon" />Deals</a
        >
      </div>
    </div>
  {/if}
</div>

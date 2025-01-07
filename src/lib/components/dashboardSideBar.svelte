<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { userStore } from '$lib/stores/user.store';
  import { goto } from '$app/navigation';

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

  const signOut = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    $userStore = null;

    goto('/');
  };
</script>

<div
  bind:this={sideMenuRef}
  class="transition-all relative z-20 duration-200 text-white bg-gray-950 p-4 pb-12 {showContent
    ? 'min-w-48'
    : 'w-fit px-2'} left-0 top-0 bottom-0 h-screen shadow relative z-10"
>
  <Icon
    name="arrow-left"
    class="transition-all duration-200 stroke-white bg-gray-950 hover:bg-gray-100 hover:stroke-gray-950 p-1 shadow absolute size-6 stroke-2 right-[-10px] top-4 rounded-md cursor-pointer {showContent
      ? ''
      : 'rotate-180'}"
    on:click={showSideMenu}
  />

  <div class="flex flex-col justify-between h-full">
    <div>
      <p class="font-semibold text-xl h-fit mb-8">
        {#if showContent}AuraMarket{/if}
      </p>
      <p class="font-semibold text-xs mb-2">
        {#if showContent}Navigation{/if}
      </p>

      <a
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        href="/"
        ><Icon name="home" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Website{/if}</a
      >
      <!-- <a
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        href="/admin/orders"
        ><Icon name="ticket" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Orders{/if}</a
      > -->

      <span
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        ><Icon name="ticket" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Orders{/if}</span
      >
      <a
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        href="/admin/inventory"
        ><Icon name="stack" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Inventory{/if}</a
      >
      <!-- <a
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        href="/admin/notifications"
        ><Icon name="bell" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Notifications{/if}</a
      > -->

      <span
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        ><Icon name="ticket" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Notifications{/if}</span
      >
      <!-- <a
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        href="/admin/settings"
        ><Icon
          name="gear"
          class="transition-colors stroke-white stroke-2 group-hover:stroke-gray-900 group-hover:fill-white"
        />
        {#if showContent}Settings{/if}</a
      > -->
      <span
        class="transition-colors font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
        ><Icon name="ticket" class="transition-colors fill-none stroke-white stroke-2 group-hover:stroke-gray-900" />
        {#if showContent}Settings{/if}</span
      >
    </div>

    <button
      on:click={signOut}
      class="transition-colors w-full font-medium text-xs flex items-center gap-1 text-white hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 group"
      ><Icon
        name="sign-out"
        class="transition-colors fill-none group-hover:stroke-gray-900 stroke-2 stroke-white"
      />{#if showContent}Sign Out{/if}</button
    >
  </div>
</div>

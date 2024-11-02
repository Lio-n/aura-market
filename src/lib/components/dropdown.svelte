<script lang="ts">
  import { onMount } from 'svelte';
  export let name: string;
  export let content: { to: string; name: string }[] = [];

  let dropdownRef: HTMLButtonElement;
  let showContent = false;
  const toggleContent = () => (showContent = !showContent);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      showContent = false;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="relative">
  <button
    on:click={toggleContent}
    bind:this={dropdownRef}
    class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900"
    >{name}<img
      src="/icons/chevron-down.svg"
      class={`w-3 ${showContent ? 'rotate-180' : 'rotate-0'}`}
      alt="chevron-down icon"
    /></button
  >

  {#if showContent}
    <ul class="absolute top-0 py-2 rounded-md grid bg-white mt-8 shadow-sm w-56 left-6">
      {#each content as item}
        <a
          href={item.to}
          class="text-xs px-4 py-2 text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-200">{item.name}</a
        >
      {/each}
    </ul>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  export let name: string;
  export let content: { to: string; name: string }[] = [];
  export let addTagIcon: boolean = false;

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
    class={`p-2 font-medium text-xs flex items-center w-full justify-between text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${showContent ? 'bg-gray-100 rounded-md' : 'bg-none'}`}
    ><span class="flex gap-2"
      >{#if addTagIcon}<img src="/icons/tag.svg" class={`w-3`} alt="chevron-down icon" />{/if}{name}</span
    ><img
      src="/icons/chevron-down.svg"
      class={`w-3 ${showContent ? 'rotate-180' : 'rotate-0'}`}
      alt="chevron-down icon"
    /></button
  >

  {#if showContent}
    <ul class="my-2 ml-2 pl-2 grid bg-white shadow-sm border-l-[1px] border-gray-200">
      {#each content as item}
        <a
          href={item.to}
          class="rounded-md font-medium text-xs px-4 py-2 text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >{item.name}</a
        >
      {/each}
    </ul>
  {/if}
</div>

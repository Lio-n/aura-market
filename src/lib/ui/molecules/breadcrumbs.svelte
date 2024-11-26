<script lang="ts">
  import Icon from '../atoms/icon.svelte';

  export let content: Array<{ to: string | null; name: string; active?: boolean; disabled?: boolean }> | [] = [];
  export let home_access: boolean = true;
</script>

<nav class="text-xs mt-4 flex gap-2 {$$props.class}">
  <!-- svelte-ignore a11y_consider_explicit_label -->
  {#if home_access}
    <a href="/" class="transition-colors flex gap-1 text-gray-700 font-medium hover:text-blue-500 group">
      <Icon name="home" class="transition-colors fill-gray-700 group-hover:fill-blue-500" /> Home
    </a>
  {/if}

  {#if home_access}
    <Icon name="chevron-down" class="fill-none stroke-gray-400 size-4 stroke-2 -rotate-90" />
  {/if}

  {#each content as item, i}
    {#if i}
      <Icon name="chevron-down" class="fill-none stroke-gray-400 size-4 stroke-2 -rotate-90" />
    {/if}

    {#if item.disabled}
      <span class="font-medium text-xs text-gray-700">{item.name}</span>
    {:else if item.to}
      <a
        href={item.to}
        class="font-medium text-xs hover:text-blue-500 {item.active ? 'text-gray-400' : 'text-gray-700'}">{item.name}</a
      >
    {:else}
      <span class="font-medium {item.active ? 'text-gray-400' : 'text-gray-700'}">{item.name}</span>
    {/if}
  {/each}
</nav>

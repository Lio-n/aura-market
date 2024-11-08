<script lang="ts">
  import Icon from '../atoms/icon.svelte';

  export let content_breadcrumbs: Array<{ to: string | null; name: string }>;
</script>

<nav class="text-xs text-gray-700 mt-4 font-medium flex">
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <a href="/">
    <Icon name="home" class="transition-colors fill-gray-700 hover:fill-gray-950" />
  </a>
  {#each content_breadcrumbs as item}
    <span class="mx-2">/</span>
    {#if item.to}
      <a href={item.to} class="text-xs text-gray-700 hover:text-gray-900">{item.name}</a>
    {:else}
      <span class="text-gray-900">{item.name}</span>
    {/if}
  {/each}
</nav>

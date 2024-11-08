<script>
  import '../app.css';
  import { layoutStore } from '$lib/stores/layout.store';
  import MainLayout from '$lib/ui/template/mainLayout.svelte';

  $layoutStore = MainLayout;
</script>

{#if $layoutStore}
  <svelte:component this={$layoutStore}>
    <slot />
  </svelte:component>
{/if}

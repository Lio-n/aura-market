<script lang="ts">
  import { favoriteStore } from '$lib/stores/favorites.store';
  import type { ProductEntity } from '$lib/stores/product.store';
  import Icon from './icon.svelte';

  export let item: ProductEntity;

  $: in_favorite = !!$favoriteStore.items.find((i) => i.id === item.id);

  const toggleFavorite = () => {
    in_favorite = !in_favorite;

    if (in_favorite) {
      favoriteStore.addItem(item);
    } else {
      favoriteStore.removeItem(item.id);
    }
  };
</script>

<button on:click={toggleFavorite} class="h-fit bg-gray-100 hover:bg-gray-200 rounded-md p-2 {$$restProps.class || ''}">
  {#if in_favorite}
    <Icon name="heart-solid" class="transition-colors fill-red-500" />
  {:else}
    <Icon name="heart-outline" class="transition-colors fill-none stroke-[1.5] stroke-gray-950" />
  {/if}
</button>

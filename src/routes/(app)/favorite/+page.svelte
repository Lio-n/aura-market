<script lang="ts">
  import { favoriteStore } from '$lib/stores/favorites.store';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import FavoriteItem from '$lib/ui/molecules/favoriteItem.svelte';

  const breadcrumbs = [{ to: '/favorite', name: 'Favorite', active: true }];
</script>

<Breadcrumbs content={breadcrumbs} class="mx-4 md:mx-6" />

<section class="mx-auto my-6 md:my-8" style="max-width: 48rem;">
  <div class="min-h-40 sm:h-full sm:border sm:rounded py-2 px-4 md:py-4 w-full">
    {#each $favoriteStore.items as item, i (item.id)}
      <div class={i !== 0 ? 'mt-4 pt-4 border-t-[1px] md:mt-6 md:pt-6' : ''}>
        <FavoriteItem {item} />
      </div>
    {/each}
  </div>
</section>

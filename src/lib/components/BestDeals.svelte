<script lang="ts">
  import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
  import CardProduct from '$lib/ui/molecules/cardProduct.svelte';
  import { onMount } from 'svelte';
  import Loading from './loading.svelte';
  import type { ProductEntity } from '$lib/stores/product.store';

  let hasError: string;
  let isLoading = true;
  let data: Array<ProductEntity> | null = null;

  const GetBestDealsProducts = async () => {
    try {
      const res = await fetch(PUBLIC_PLATZI_FAKE_STORE_API_V1 + 'products/?offset=0&limit=8');
      return await res.json();
    } catch (error) {
      hasError = 'Something goes wrong!';
    } finally {
      isLoading = false;
    }
  };

  onMount(async () => {
    data = await GetBestDealsProducts();
  });
</script>

{#if !hasError}
  <section class="p-4 md:py-8 md:px-12 {$$restProps.class || ''}">
    <h2 class="text-xl mb-4 font-bold text-gray-900">Todays Best Deals For You!</h2>

    {#if isLoading}
      <Loading class="h-80" />
    {/if}

    {#if data}
      <ul
        class="grid grid-cols-[repeat(8,_minmax(10rem,_1fr))] md:grid-cols-[repeat(8,_minmax(10rem,_1fr))] pb-4 overflow-x-auto gap-4"
      >
        {#each data as item}
          <CardProduct {item} />
        {/each}
      </ul>
    {/if}
  </section>
{/if}

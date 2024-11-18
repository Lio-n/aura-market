<script lang="ts">
  import ProductCard from '$lib/ui/molecules/productCard.svelte';
  import { onMount } from 'svelte';
  import Loading from './loading.svelte';
  import type { ProductEntity } from '$lib/stores/product.store';
  import { ProductService, type ApiError } from '$lib/services/productService';

  let error: ApiError | null;
  let isLoading = true;
  let data: Array<ProductEntity> | null = null;

  onMount(async () => {
    const res = await ProductService.getProducts('/?offset=0&limit=8');
    data = res?.data;
    error = res?.error;
    isLoading = false;
  });
</script>

{#if !error?.message}
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
          <ProductCard {item} />
        {/each}
      </ul>
    {/if}
  </section>
{/if}

<script lang="ts">
  import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
  import ProductCard from '$lib/ui/molecules/productCard.svelte';
  import { onMount } from 'svelte';
  import Loading from './loading.svelte';
  import type { ProductEntity } from '$lib/stores/product.store';
  import { codeByCategory } from '../../constants';

  onMount(async () => {
    data = await GetMostSellingProductsByCategory(codeByCategory.Clothes);
  });

  let hasError: string;
  let isLoading = true;
  let data: Array<ProductEntity> | null = null;

  const cache: { [key: number]: Array<ProductEntity> } = {};
  let currentCategoryName = 'Clothes';

  const GetMostSellingProductsByCategory = async (categoryId: number) => {
    if (cache[categoryId]) {
      return cache[categoryId];
    }

    try {
      const res = await fetch(PUBLIC_PLATZI_FAKE_STORE_API_V1 + `products/?categoryId=${categoryId}&offset=0&limit=8`);
      const parsedJson = await res.json();

      cache[categoryId] = parsedJson;

      return parsedJson;
    } catch (error) {
      hasError = 'Something goes wrong!';
    } finally {
      isLoading = false;
    }
  };

  const handleSubmit = async (event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;

    if (currentCategoryName === button.name) return;

    currentCategoryName = button.name;
    data = await GetMostSellingProductsByCategory(codeByCategory[button.name]);
  };
</script>

{#if !hasError}
  <section class="px-4 py-4 md:py-8 md:px-12">
    <h2 class="text-xl mb-4 font-bold text-gray-900">Most Selling Products</h2>

    <ul class="flex gap-2 overflow-x-auto mt-4 pb-4">
      <button
        name="Clothes"
        class="rounded-full px-4 py-2 bg-cyan-600 text-white font-medium text-sm"
        on:click={handleSubmit}>Clothes</button
      ><button
        name="Shoes"
        class="rounded-full px-4 py-2 border-gray-200 border-2 text-gray-700 font-medium text-sm"
        on:click={handleSubmit}>Shoes</button
      ><button
        name="Miscellaneous"
        class="rounded-full px-4 py-2 border-gray-200 border-2 text-gray-700 font-medium text-sm"
        on:click={handleSubmit}>Miscellaneous</button
      ><button
        name="Electronics"
        class="rounded-full px-4 py-2 border-gray-200 border-2 text-gray-700 font-medium text-sm"
        on:click={handleSubmit}>Electronics</button
      >
    </ul>

    {#if isLoading}
      <Loading class="h-80" />
    {/if}

    {#if data}
      <ul class="grid grid-cols-[repeat(4,_minmax(10rem,_1fr))] pb-4 overflow-x-auto gap-x-4 gap-y-6">
        {#each data as item}
          <ProductCard {item} />
        {/each}
      </ul>
    {/if}
  </section>
{/if}

<script lang="ts">
  import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
  import ProductCard from '$lib/ui/molecules/productCard.svelte';
  import { onMount } from 'svelte';
  import Loading from './loading.svelte';
  import { CATEGORY, categoryStore, type ProductEntity } from '$lib/stores/product.store';
  import { ProductService, type ApiError } from '$lib/services/productService';

  let error: ApiError | null;
  let isLoading = $state(true);
  let data: Array<ProductEntity> | null = $state(null);

  const cache: { [key in CATEGORY]: Array<ProductEntity> } = {
    [CATEGORY['Clothes']]: [],
    [CATEGORY['Electronics']]: [],
    [CATEGORY['Miscellaneous']]: [],
    [CATEGORY['Shoes']]: [],
  };
  let currentCategoryName = $state(CATEGORY.Clothes);

  const GetMostSellingProductsByCategory = async (category: CATEGORY) => {
    if (cache[category].length) {
      data = cache[category];
      return;
    }

    const res = await ProductService.getByCategory(currentCategoryName, '&offset=0&limit=8');
    data = res?.data;
    error = res?.error;
    isLoading = false;
  };

  const handleSubmit = async (event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;

    console.log(button);
    if (currentCategoryName === button.name) return;

    currentCategoryName = button.name as CATEGORY;
    console.log(currentCategoryName, Object.entries($categoryStore));

    await GetMostSellingProductsByCategory(currentCategoryName);
  };

  onMount(async () => {
    await GetMostSellingProductsByCategory(currentCategoryName);
  });
</script>

{#if !error?.message}
  <section class="px-4 py-4 md:py-8 md:px-12">
    <h2 class="text-xl mb-4 font-bold text-gray-900">Most Selling Products</h2>

    <ul class="flex gap-2 overflow-x-auto mt-4 pb-4">
      {#each Object.entries($categoryStore) as [_, item]}
        <button
          name={item.name}
          class="rounded-full px-4 py-2 font-medium text-sm {currentCategoryName === item.name
            ? 'bg-cyan-600 text-white'
            : 'border-gray-200 border-2 text-gray-700'}"
          on:click={handleSubmit}>{item.name}</button
        >
      {/each}
    </ul>

    {#if isLoading}
      <Loading class="h-80" />
    {/if}

    {#if data?.length}
      <ul class="grid grid-cols-[repeat(4,_minmax(10rem,_1fr))] pb-4 overflow-x-auto gap-x-4 gap-y-6">
        {#each data as item}
          <ProductCard {item} />
        {/each}
      </ul>
    {:else}
      <div class="h-60 grid place-items-center">
        <h2 class="font-medium text-gray-700">No products found</h2>
      </div>
    {/if}
  </section>
{/if}

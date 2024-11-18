<script lang="ts">
  import BestDeals from '$lib/components/BestDeals.svelte';
  import Loading from '$lib/components/loading.svelte';
  import { ProductService } from '$lib/services/productService.js';
  import { CATEGORY, productsStore, type ProductEntity } from '$lib/stores/product.store.js';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import ProductCard from '$lib/ui/molecules/productCard.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // svelte-ignore non_reactive_update
  let currCategory: string = $page.params.slug || '';

  $effect(() => {
    currCategory = $page.params.slug || '';
    GetProductsByCategory(currCategory as CATEGORY);
  });

  const breadcrumbs = $derived([
    { to: null, name: 'category' },
    { to: null, name: currCategory?.charAt(0).toUpperCase() + currCategory?.slice(1) },
  ]);

  let isLoading = $state(true);
  let data: Array<ProductEntity> | null = $state(null);

  const GetProductsByCategory = async (category: CATEGORY) => {
    const res = await ProductService.getByCategory(currCategory as CATEGORY, '&offset=0&limit=8');

    let productsByCategory: Array<ProductEntity> = [];
    productsStore.subscribe((item) => {
      productsByCategory = item.filter((i) => i.category.name === currCategory);
    });

    data = res?.data?.length ? [...productsByCategory, ...res?.data] : [...productsByCategory];
    isLoading = false;
  };

  onMount(async () => {
    await GetProductsByCategory(currCategory as CATEGORY);
  });
</script>

<div class="mx-4">
  <Breadcrumbs content_breadcrumbs={breadcrumbs} />

  <section class="py-4">
    <div class="flex justify-end mb-4">
      <button class="border-2 px-4 py-2 rounded-md border-gray-200 text-xs font-medium">Sort by</button>
    </div>

    <h2 class="text-xl mb-4 font-bold text-gray-900">
      Best <span class="decoration-1 underline-offset-4 underline decoration-dashed">{currCategory}</span> For You!
    </h2>

    {#if isLoading}
      <Loading class="h-80" />
    {/if}

    {#if data?.length}
      <ul class="grid grid-cols-[repeat(4,_minmax(10rem,_1fr))] mb-8 overflow-x-auto gap-x-4 gap-y-6">
        {#each data.slice(0, 8) as item}
          <ProductCard {item} />
        {/each}
      </ul>
    {:else}
      <div class="h-60 grid place-items-center">
        <h2 class="font-medium text-gray-700">No products found</h2>
      </div>
    {/if}

    <BestDeals class="!px-0" />
  </section>
</div>

<script lang="ts">
  import BestDeals from '$lib/components/BestDeals.svelte';
  import Loading from '$lib/components/loading.svelte';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import ProductCard from '$lib/ui/molecules/productCard.svelte';

  let { data } = $props();

  let isLoading = !data.products;

  const breadcrumbs = $derived([
    { to: null, name: 'category' },
    { to: null, name: data.category.charAt(0).toUpperCase() + data.category.slice(1) },
  ]);
</script>

<div class="mx-4">
  <Breadcrumbs content_breadcrumbs={breadcrumbs} />

  <section class="py-4">
    <div class="flex justify-end mb-4">
      <button class="border-2 px-4 py-2 rounded-md border-gray-200 text-xs font-medium">Sort by</button>
    </div>

    <h2 class="text-xl mb-4 font-bold text-gray-900">
      Best <span class="decoration-1 underline-offset-4 underline decoration-dashed">{data.category}</span> For You!
    </h2>

    {#if isLoading}
      <Loading class="h-80" />
    {/if}

    {#if data?.products?.length !== 0}
      <ul class="grid grid-cols-[repeat(4,_minmax(10rem,_1fr))] mb-8 overflow-x-auto gap-x-4 gap-y-6">
        {#each data.products as item}
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

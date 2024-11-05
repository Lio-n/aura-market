<script>
  import BestDeals from '$lib/components/BestDeals.svelte';
  import Loading from '$lib/components/loading.svelte';
  import CardProduct from '$lib/ui/molecules/cardProduct.svelte';

  let { data } = $props();

  let hasError = null;
  let isLoading = !data.products;
</script>

{#if !hasError}
  <section class="px-4 py-4 md:py-8 md:px-12">
    <div class="flex justify-end mb-4">
      <button class="border-2 px-4 py-2 rounded-md border-gray-200 text-xs font-medium">Sort by</button>
    </div>

    <h2 class="text-xl mb-4 font-bold text-gray-900">
      <span class="decoration-1 underline-offset-4 underline decoration-dashed">{data.query}</span> For You!
    </h2>

    {#if isLoading}
      <Loading class="h-80" />
    {/if}

    {#if data}
      <ul class="grid grid-cols-[repeat(4,_minmax(10rem,_1fr))] mb-8 overflow-x-auto gap-x-4 gap-y-6">
        {#each data.products as item}
          <CardProduct {item} />
        {/each}
      </ul>
    {/if}

    <BestDeals class="!px-0" />
  </section>
{/if}

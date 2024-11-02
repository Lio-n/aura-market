<script>
  import CardProduct from '$lib/ui/molecules/cardProduct.svelte';
  import Services from '$lib/ui/organisms/services.organism.svelte';
  import TopCategories from '$lib/ui/organisms/topCategories.organism.svelte';
  import TopDiscounts from '$lib/ui/organisms/topDiscounts.organism.svelte';

  const Deals = Array.from({ length: 8 }, (_, i) => i + 1);
  const Selling = Array.from({ length: 8 }, (_, i) => i + 1);
</script>

<section class="py-12 md:py-20 h-[10rem] md:h-[25rem] bg-pink-500 grid place-content-center text-2xl md:text-5xl">
  <h1>Hero</h1>
</section>

<div class="py-4 md:py-2" />

<TopCategories />

<div class="py-4 md:py-2" />

<section class="px-4 py-4 md:py-8 md:px-12">
  <h2 class="text-xl mb-4 font-bold">Todays Best Deals For You!</h2>

  <ul
    class="grid grid-cols-[repeat(8,_minmax(10rem,_auto))] md:grid-cols-[repeat(8,_minmax(10rem,_auto))] pb-4 overflow-x-auto gap-4"
  >
    {#each Deals as item}
      <CardProduct />
    {/each}
  </ul>
</section>

<div class="py-4 md:py-2" />

<TopDiscounts />

<div class="py-4 md:py-2" />

<section class="px-4 py-4 md:py-8 md:px-12">
  <h2 class="text-xl mb-4 font-bold">Most Selling Products</h2>

  <ul class="flex gap-2 overflow-x-auto mt-4 pb-4">
    <button class="rounded-full px-4 py-2 bg-cyan-600 text-white font-medium text-sm">Clothes</button><button
      class="rounded-full px-4 py-2 border-gray-200 border-2 text-gray-700 font-medium text-sm">Shoes</button
    ><button class="rounded-full px-4 py-2 border-gray-200 border-2 text-gray-700 font-medium text-sm"
      >Miscellaneous</button
    ><button class="rounded-full px-4 py-2 border-gray-200 border-2 text-gray-700 font-medium text-sm"
      >Electronics</button
    >
  </ul>

  <ul class="grid grid-cols-[repeat(4,_minmax(10rem,_auto))] pb-4 overflow-x-auto gap-4">
    {#each Selling as item}
      <CardProduct />
    {/each}
  </ul>
</section>

<div class="py-4 md:py-2" />

<Services />

<div class="py-4" />

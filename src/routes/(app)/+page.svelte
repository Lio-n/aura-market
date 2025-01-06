<script>
  import BestDeals from '$lib/components/BestDeals.svelte';
  import MostSelling from '$lib/components/MostSelling.svelte';
  import Services from '$lib/ui/organisms/services.organism.svelte';
  import TopCategories from '$lib/ui/organisms/topCategories.organism.svelte';
  import TopDiscounts from '$lib/ui/organisms/topDiscounts.organism.svelte';
</script>

<!-- <section class="py-12 md:py-20 h-[10rem] md:h-[25rem] bg-pink-500 grid place-content-center text-2xl md:text-5xl">
  <h1>Hero</h1>
</section> -->

<div class="py-4 md:py-2"></div>

<TopCategories />

<div class="py-4 md:py-2"></div>

<BestDeals />

<div class="py-4 md:py-2"></div>

<TopDiscounts />

<div class="py-4 md:py-2"></div>

<MostSelling />

<div class="py-4 md:py-2"></div>

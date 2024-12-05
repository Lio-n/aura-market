<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import Button from '../atoms/button.svelte';
  import CartButton from '../atoms/cartButton.svelte';
  import FavoriteButton from '../atoms/favoriteButton.svelte';

  export let product: ProductEntity;
</script>

<section class="grid sm:grid-cols-2 gap-4 md:gap-12 mt-8">
  <div>
    <img
      class="size-full object-contain rounded-md max-h-60 sm:max-h-96"
      src={product.images[0]}
      alt="{product.title} image"
    />
  </div>

  <div>
    <div class="border-b-[1px] pb-4">
      <div class="flex justify-between gap-2 sm:gap-4">
        <h2 class="text-2xl sm:text-4xl mb-2 sm:mb-4 font-bold text-gray-900">{product.title}</h2>
        <FavoriteButton item={product} />
      </div>
      <p class="text-xs text-gray-700">{product.description}</p>
    </div>

    <span class="flex text-2xl text-green-600 font-semibold my-4">
      <span class="text-base">$</span>
      {product.price}
    </span>

    <div class="flex gap-2">
      <Button text="Buy Now" size="medium"></Button>

      <CartButton item={product} variant="outline" size="medium" />
    </div>
  </div>
</section>

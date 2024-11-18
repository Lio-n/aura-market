<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import Button from '../atoms/button.svelte';
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
        <FavoriteButton id={product.id} />
      </div>
      <p class="text-xs text-gray-700">{product.description}</p>
    </div>

    <div class="flex justify-between items-center my-4 sm:my-6 md-my-8">
      <div class="flex bg-gray-100 text-gray-900 rounded-md font-semibold">
        <button class="px-4 hover:bg-gray-200">-</button>
        <span class="px-4 py-2">10</span>
        <button class="px-4 hover:bg-gray-200">+</button>
      </div>

      <span class="flex text-2xl text-green-600 font-semibold">
        <span class="text-base">$</span>
        {product.price}
      </span>
    </div>

    <div class="flex gap-2">
      <Button text="Buy Now" size="medium"></Button>

      <Button text="Add to cart" variant="outline" icon="shopping-bag" size="medium"></Button>
    </div>
  </div>
</section>

<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import { imageFallback } from '$lib/helper/imageFallback';
  import FavoriteButton from '../atoms/favoriteButton.svelte';
  import CartButton from '../atoms/cartButton.svelte';
  import Img from '../atoms/img.svelte';

  export let item: ProductEntity;

  let itemInCart = false;
</script>

<div class="w-full text-gray-700">
  <div class="group relative bg-gray-100 h-32 rounded-md overflow-hidden">
    <a href="/product/{item.id}">
      <Img
        src={item.images[0]}
        class="h-32 z-0 w-full bg-gray-100 object-contain absolute transition duration-500 ease-in-out group-hover:scale-110"
        alt="{item.title} image"
      />
    </a>
    <FavoriteButton {item} class="absolute top-0 right-0 bg-white !p-1 mt-2 mr-2" />
  </div>

  <div class="flex justify-between gap-4 font-semibold mt-4 mb-2">
    <span class="line-clamp-2 text-sm">{item.title}</span>
    <span class="flex text-base">
      <span class="text-xs">$</span>
      {item.price}
    </span>
  </div>

  <div class="flex text-xs gap-2">
    <span>{item.category.name}</span><span>-</span>
    <p class="truncate">
      {item.description}
    </p>
  </div>

  <div class="mt-4">
    <CartButton {item} />
  </div>
</div>

<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import { imageFallback } from '$lib/helper/imageFallback';

  export let item: ProductEntity;

  let itemInCart = false;
  let itemAsFavorite = false;
</script>

<div class="w-full text-gray-700">
  <div class="group relative bg-gray-100 h-40 rounded-md overflow-hidden">
    <a href="/product/{item.id}">
      <img
        src={item.images[0]}
        on:error={imageFallback}
        class="h-40 z-0 w-full object-cover absolute transition duration-500 ease-in-out group-hover:scale-110"
        alt="{item.title} image"
      />
    </a>
    <button
      on:click={() => (itemAsFavorite = !itemAsFavorite)}
      class="absolute top-0 right-0 bg-white rounded-md p-1 mt-2 mr-2"
    >
      {#if itemAsFavorite}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 fill-red-500">
          <path
            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4 stroke-gray-900"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      {/if}
    </button>
  </div>

  <div class="flex justify-between gap-4 font-semibold mt-4">
    <span class="line-clamp-2">{item.title}</span>
    <span class="flex text-lg text-green-600">
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

  {#if itemInCart}
    <div
      class="flex gap-2 justify-center py-2 px-4 text-xs w-full mt-4 font-semibold text-gray-900 border-2 border-transparent bg-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4 stroke-gray-900"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      Item in cart
    </div>
  {:else}
    <button
      on:click={() => (itemInCart = true)}
      class="transition-colors flex gap-2 justify-center bg-gray-950 rounded-md py-2 px-4 text-xs w-full mt-4 text-white font-semibold border-2 border-transparent hover:bg-white hover:border-gray-900 hover:text-gray-900 group"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#E5E7EB"
        class="transition-colors size-4 group-hover:stroke-gray-900"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
      Add to cart
    </button>
  {/if}
</div>

<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import Button from '../atoms/button.svelte';
  import { favoriteStore } from '$lib/stores/favorites.store';
  import CartButton from '../atoms/cartButton.svelte';
  import Icon from '../atoms/icon.svelte';

  let { item }: { item: ProductEntity } = $props();
</script>

<div class="flex max-sm:flex-col gap-4 justify-between sm:min-w-80">
  <div class="max-sm:flex max-sm:justify-between">
    <div class="flex gap-4">
      <img
        src={item.images[0]}
        alt="clothe - img"
        class="max-sm:size-10 sm:size-16 md:size-20 rounded object-contain"
      />
      <div class="flex flex-col justify-between">
        <a href="product/{item.id}">
          <h3
            class="line-clamp-2 font-semibold max-sm:text-xs after:bg-[url('/icons/arrow-archor.svg')] after:content-[''] after:size-3 after:inline-block after:ml-1 underline decoration-dotted decoration-1 underline-offset-4 hover:text-gray-400 hover:decoration-gray-400"
          >
            {item.title}
          </h3>
        </a>
        <div class="flex text-xs gap-2 text-gray-700">
          <span>{item.category.name}</span><span>-</span>
          <span>{item?.specifications?.brand || 'Lorem ipsum'}</span><span>-</span><span
            >{item?.specifications?.model || 'Lorem ipsum'}</span
          >
        </div>
      </div>
    </div>

    <span class="sm:hidden text-gray-900 max-sm:text-base"
      >{parseFloat(item.price + '').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}</span
    >
  </div>

  <div class="flex flex-col justify-between items-end">
    <span class="max-sm:hidden text-gray-900 max-sm:text-base"
      >{parseFloat(item.price + '').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}</span
    >

    <div class="flex items-center gap-4">
      <CartButton {item} />

      <Button
        variant="ghost"
        text="Remove"
        class="max-sm:text-xs font-light hover:text-gray-400"
        on:click={() => favoriteStore.removeItem(item.id)}
      ></Button>
    </div>
  </div>
</div>

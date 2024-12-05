<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import Button from '../atoms/button.svelte';
  import Count from '../atoms/count.svelte';
  import { cartStore } from '$lib/stores/cart.store';
  import Img from '../atoms/img.svelte';

  let { item, quantity }: { item: ProductEntity; quantity: number } = $props();

  const handleCount = (count: number) => cartStore.updateQuantity(item.id, count);
</script>

<div class="flex justify-between sm:min-w-80">
  <div class="flex gap-4">
    <Img src={item.images[0]} alt="clothe - img" class="max-sm:size-10 sm:size-16 md:size-20 rounded object-contain" />
    <div class="flex flex-col justify-between">
      <a href="product/{item.id}" class="w-fit">
        <h3
          class="line-clamp-2 font-semibold max-sm:text-xs after:bg-[url('/icons/arrow-archor.svg')] after:content-[''] after:size-3 after:inline-block after:ml-1 underline decoration-dotted decoration-1 underline-offset-4 hover:text-gray-400 hover:decoration-gray-400"
        >
          {item.title}
        </h3>
      </a>

      <Count size="small" class="bg-white" value={quantity} callback={handleCount} min={1} />
    </div>
  </div>

  <div class="flex flex-col justify-between items-end">
    <span class="text-gray-900 max-sm:text-base"
      >{parseFloat(item.price + '').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}</span
    >
    <Button
      variant="ghost"
      text="Remove"
      class="max-sm:text-xs font-light hover:text-gray-400"
      on:click={() => cartStore.removeItem(item.id)}
    ></Button>
  </div>
</div>

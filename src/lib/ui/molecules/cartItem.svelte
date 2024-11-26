<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';
  import Button from '../atoms/button.svelte';
  import Count from '../atoms/count.svelte';
  import { cartStore } from '$lib/stores/cart.store';

  let { item, quantity }: { item: ProductEntity; quantity: number } = $props();

  const handleCount = (count: number) => cartStore.updateQuantity(item.id, count);
</script>

<div class="flex justify-between sm:min-w-80">
  <div class="flex gap-4">
    <img src={item.images[0]} alt="clothe - img" class="max-sm:size-10 sm:size-16 md:size-20 rounded object-contain" />
    <div class="flex flex-col justify-between">
      <h3 class="line-clamp-2 font-semibold max-sm:text-xs">{item.title}</h3>
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

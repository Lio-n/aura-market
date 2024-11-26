<script lang="ts">
  import type { ProductEntity } from '$lib/stores/product.store';

  let { item, quantity }: { item: ProductEntity; quantity: number } = $props();
</script>

<div class="flex justify-between gap-4">
  <div class="flex gap-2">
    <img src={item.images[0]} alt="" class="size-16 rounded" />

    <div class="flex flex-col justify-between text-gray-700">
      <h4 class="line-clamp-2 font-semibold text-sm">{item.title}</h4>
      <span class="line-clamp-2 text-xs">x{quantity}</span>
    </div>
  </div>

  <span class="text-gray-900 font-semibold text-xs"
    >{parseFloat(item.price + '').toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}</span
  >
</div>

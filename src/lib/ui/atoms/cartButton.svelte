<script lang="ts">
  import { cartStore } from '$lib/stores/cart.store';
  import type { ProductEntity } from '$lib/stores/product.store';
  import Button from './button.svelte';
  import Icon from './icon.svelte';

  export let variant: 'outline' | 'solid' | 'ghost' = 'solid';
  export let size: 'small' | 'medium' = 'small';
  export let item: ProductEntity;

  $: in_cart = !!$cartStore.items[item.id];

  $: console.log($cartStore);

  const toggleCart = () => {
    in_cart = !in_cart;

    if (in_cart) {
      cartStore.addItem(item);
    } else {
      cartStore.removeItem(item.id);
    }
  };
</script>

{#if in_cart}
  <div
    class="flex items-center gap-2 justify-center py-2 px-4 text-xs w-full font-semibold text-gray-700 border-2 border-transparent bg-white text-nowrap"
  >
    <Icon name="check" class="fill-none stroke-gray-950" />
    Item in cart
  </div>
{:else}
  <Button on:click={toggleCart} {variant} {size} icon="shopping-bag" text="Add to cart" class="text-nowrap px-4" />
{/if}

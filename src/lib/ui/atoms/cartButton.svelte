<script lang="ts">
  import { cartStore } from '$lib/stores/cart.store';
  import Button from './button.svelte';
  import Icon from './icon.svelte';

  export let id: number;

  $: in_cart = $cartStore.includes(id);

  const toggleCart = () => {
    in_cart = !in_cart;

    if (in_cart) {
      $cartStore = [...$cartStore, id];
    } else {
      $cartStore = $cartStore.filter((productId) => productId !== id);
    }
  };
</script>

{#if in_cart}
  <div
    class="flex gap-2 justify-center py-2 px-4 text-xs w-full mt-4 font-semibold text-gray-700 border-2 border-transparent bg-white"
  >
    <Icon name="check" class="fill-none stroke-gray-950" />
    Item in cart
  </div>
{:else}
  <Button on:click={toggleCart} icon="shopping-bag" text="Add to cart" class="mt-4" />
{/if}

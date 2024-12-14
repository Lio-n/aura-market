<script lang="ts">
  import { goto } from '$app/navigation';
  import { cartStore } from '$lib/stores/cart.store';
  import { checkoutStore } from '$lib/stores/checkout.store';
  import Button from '$lib/ui/atoms/button.svelte';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import CartItem from '$lib/ui/molecules/cartItem.svelte';

  const breadcrumbs = [{ to: '/cart', name: 'Cart', active: true }];

  const handleCheckout = () => {
    checkoutStore.set({ ...$checkoutStore, total_price: $cartStore.total_price, items: $cartStore.items });

    goto('/checkout');
  };
</script>

<Breadcrumbs content={breadcrumbs} class="mx-4 md:mx-6" />

<section class="grid md:grid-cols-[auto,_20rem] gap-4 md:mx-2 my-6 md:my-8">
  <div>
    <div class="sm:h-full sm:border sm:rounded py-2 px-4 md:py-4 w-full space-y-4 md:space-y-6">
      {#each $cartStore.items as data (data.item.id)}
        <CartItem item={data.item} quantity={data.quantity} />
      {/each}
    </div>
  </div>

  <div class="h-fit sticky top-[5rem] border rounded py-2 px-4 md:py-4 space-y-6 min-w-80">
    <div class="flex flex-col gap-2">
      <span class="flex justify-between">
        <span class="text-gray-400 text-xs md:text-sm">Subtotal</span>
        <span class="font-semibold text-sm md:text-md text-gray-700"
          >{$cartStore.total_price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span
        >
      </span>

      <div class="overflow-auto min-h-24 border-y my-2 py-2">
        {#each $cartStore.items as data (data.item.id)}
          <span class="flex justify-between gap-4">
            <span class="text-gray-600 text-sm"
              >{data.quantity}x<span class="text-xs text-gray-400">{data.item.title}</span></span
            >
            <span class="font-semibold text-xs text-gray-600"
              >{(data.item.price * data.quantity).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}</span
            >
          </span>
        {/each}
      </div>

      <span class="text-xs md:text-sm text-gray-400 flex justify-between">
        <span>Discount</span>
        <span>$0</span>
      </span>
    </div>

    <div class="pt-4 border-t-[1px]">
      <span class="text-gray-700 text-md md:text-base font-semibold flex justify-between">
        <span>Grand total</span>
        <span
          >{$cartStore.total_price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span
        >
      </span>

      <Button
        text="Checkout now"
        class="mt-2"
        on:click={handleCheckout}
        disabled={!Object.keys($cartStore.items).length}
      />
    </div>
  </div>
</section>

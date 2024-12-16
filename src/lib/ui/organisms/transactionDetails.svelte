<script context="module">
  export interface ITransactionDetails {
    order_id: string;
    items: Record<number, CartItem>;
    customer: {
      email: string;
    };
    total_price: number;
    credit_card: {
      last_4_digits: string;
    };
    shipping_method: SHIPPING_TYPES;
    createdAt: Date;
  }
</script>

<script lang="ts">
  import type { CartItem } from '$lib/stores/cart.store';
  import { SHIPPING_METHOD, type SHIPPING_TYPES } from '../../../constants';
  import Icon from '../atoms/icon.svelte';
  import CheckoutItem from '../molecules/checkoutItem.svelte';

  export let data: ITransactionDetails;
  export let preview: boolean = false;
</script>

<div class="m-4 sm:mx-auto">
  <div class="flex flex-col items-center space-y-4 border-b pb-4">
    <div class="w-fit rounded-full border-4 border-green-300 bg-green-50 p-2">
      <Icon name="check" class="stroke-[2.5px] size-8 stroke-green-300 fill-none" />
    </div>
    <div class="space-y-4 text-center">
      <h1 class="text-lg font-bold text-gray-600">Thanks for your order!</h1>
      <p class="text-xs text-gray-500">The order confirmation has been sent to {data.customer.email}</p>
    </div>
  </div>

  <div class="mt-4 space-y-4 pb-4">
    <div class="border-b pb-4">
      <h3 class="text-sm font-bold text-gray-600">Transaction Date</h3>
      <p class="text-xs text-gray-500 mt-2">
        {data.createdAt?.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>

    <div class="border-b pb-4">
      <h3 class="text-sm font-bold text-gray-600">Payment Method</h3>
      <p class="text-xs text-gray-500 mt-2">Credit Card ending with {data.credit_card.last_4_digits}</p>
    </div>

    <div class="border-b pb-4">
      <h3 class="text-sm font-bold text-gray-600">Shipping Method</h3>
      <p class="text-xs text-gray-500 mt-2">
        {SHIPPING_METHOD[data.shipping_method].label} delivery ({SHIPPING_METHOD[data.shipping_method].lead_time
          .min}-{SHIPPING_METHOD[data.shipping_method].lead_time.max} business days)
      </p>
      {#if !preview}
        <a
          href="/account/orders/{data.order_id}"
          class="w-fit block mt-4 text-sm underline font-bold text-gray-700 hover:text-gray-500">TRACK ORDER</a
        >
      {/if}
    </div>
  </div>

  <div class="space-y-2">
    <div>
      <h3 class="text-sm mb-4 font-bold text-gray-700">Your order</h3>
      <div class="space-y-4 overflow-y-auto max-h-60 no-scrollbar">
        {#each Object.values(data.items) as { item, quantity }}
          <CheckoutItem {item} {quantity} />
        {/each}
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="flex justify-between">
        <span class="text-gray-400 text-xs md:text-sm">Subtotal</span>
        <span class="font-semibold text-sm md:text-md text-gray-700"
          >{parseFloat(data.total_price + '').toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span
        >
      </span>

      <span class="text-xs md:text-sm text-gray-400 flex justify-between">
        <span>Discount</span>
        <span>$0</span>
      </span>

      <span class="flex justify-between">
        <span class="text-gray-400 text-xs md:text-sm">Shipment Cost</span>
        <span class="font-semibold text-sm md:text-md text-gray-700"
          >{SHIPPING_METHOD[data.shipping_method].price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span
        >
      </span>
    </div>

    <div class="pt-4 border-t-[1px]">
      <span class="text-gray-700 text-md md:text-base font-semibold flex justify-between">
        <span>Grand total</span>
        <span
          >{(
            parseFloat(data.total_price + '') + parseFloat(SHIPPING_METHOD[data.shipping_method].price + '')
          ).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span
        >
      </span>

      {#if !preview}
        <a
          href="/cart"
          class="mt-4 flex gap-2 justify-center items-center transition-colors rounded-md w-full font-semibold border-2 border-gray-950 bg-gray-950 text-white hover:bg-white hover:text-gray-950 group py-2 px-4 sm:py-4 sm:px-6 text-xs sm:text-md"
          >Continue shopping</a
        >
      {/if}
    </div>
  </div>
</div>

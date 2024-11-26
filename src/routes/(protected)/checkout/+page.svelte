<script lang="ts">
  import { checkoutStore, type CheckoutDetails } from '$lib/stores/checkout.store';
  import Button from '$lib/ui/atoms/button.svelte';
  import SelectField from '$lib/ui/atoms/selectField.svelte';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import ShippingAddress from '$lib/ui/organisms/shippingAddress.svelte';
  import { SHIPPING_METHOD, SHIPPING_TYPES } from '../../../constants';
  import CheckboxCard from '$lib/ui/atoms/checkboxCard.svelte';
  import { enhance } from '$app/forms';
  import CheckoutItem from '$lib/ui/molecules/checkoutItem.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  let { data } = $props();

  const breadcrumbs = [
    { to: '/cart', name: 'Cart' },
    { to: '/checkout', name: 'Checkout', active: true },
    { to: '/payment', name: 'Payment', disabled: true },
  ];

  const onSubmitedForm = (parsedCheckout: Pick<CheckoutDetails, 'customer' | 'shipping'>) => {
    checkoutStore.set({ ...$checkoutStore, ...parsedCheckout });

    setTimeout(() => {
      goto('/payment');
    }, 0);
  };

  let shipping_method = $state(SHIPPING_TYPES.FREE);
  let grand_price = $checkoutStore?.total_price;
  let enable_payment: boolean = false;

  onMount(() => {
    if ($checkoutStore?.items && !Object.values($checkoutStore.items).length) goto('/cart');
  });
</script>

<Breadcrumbs content={breadcrumbs} class="mx-4 md:mx-6" />

<section class="grid md:grid-cols-[auto,_20rem] gap-4 md:mx-2 my-6 md:my-8">
  <form
    id="checkout_form"
    method="POST"
    action="?/createCheckout"
    use:enhance={(e) => {
      return async ({ result, update }) => {
        if (result.type === 'success' && result?.data?.success)
          onSubmitedForm(result?.data.checkout as Pick<CheckoutDetails, 'customer' | 'shipping'>);

        await update({ reset: false });
      };
    }}
  >
    <div class="sm:border sm:rounded py-2 px-4 md:py-4 w-full space-y-4 md:space-y-6">
      <span class="pb-4 md:pb-6 border-b block">
        {#if data.countries}
          <h3 class="text-sm mb-4 font-bold text-gray-700">Select Shipping Country</h3>
          <SelectField options={data.countries} name="country" placeholder="Select country" />
        {/if}
      </span>

      <div>
        <h3 class="text-sm mb-4 font-bold text-gray-700">Shipping Address</h3>

        <ShippingAddress />
      </div>

      <span>
        <h3 class="text-sm mb-4 font-bold text-gray-700">Shipping method</h3>
        <div class="space-y-2">
          {#each Object.values(SHIPPING_METHOD) as item}
            <CheckboxCard
              value={item.method}
              id={item.label}
              name="shipping_method"
              checked={SHIPPING_TYPES.FREE === item.method}
              bind:group={shipping_method}
            >
              <div class="flex justify-between gap-2 w-full">
                <div class="flex flex-col justify-between">
                  <h4 class="font-semibold max-sm:text-xs">{item.label}</h4>
                  <span class="text-xs">{item.lead_time}</span>
                </div>

                <span
                  >{item.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}</span
                >
              </div>
            </CheckboxCard>
          {/each}
        </div>
      </span>
    </div>
  </form>

  <div class="sticky top-[5rem] border rounded py-2 px-4 md:py-4 space-y-6 min-w-80 h-fit">
    <div>
      <h3 class="text-sm mb-4 font-bold text-gray-700">Your order</h3>
      <div class="space-y-4 overflow-y-auto max-h-60 no-scrollbar">
        {#each Object.values($checkoutStore.items) as data}
          <CheckoutItem item={data.item} quantity={data.quantity} />
        {/each}
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="flex justify-between">
        <span class="text-gray-400 text-xs md:text-sm">Subtotal</span>
        <span class="font-semibold text-sm md:text-md text-gray-700"
          >{$checkoutStore?.total_price.toLocaleString('en-US', {
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
          >{SHIPPING_METHOD[shipping_method].price.toLocaleString('en-US', {
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
          >{(grand_price + SHIPPING_METHOD[shipping_method].price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</span
        >
      </span>

      <Button text="Continue to payment" class="mt-2" type="submit" form="checkout_form" disabled={enable_payment} />
    </div>
  </div>
</section>

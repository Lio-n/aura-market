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
  import { type CreateCheckoutType } from '$lib/schemas/checkout.schema';
  import { shippingAddressStore, type ShippingAddressEntity } from '$lib/stores/shippingAddress.store';
  import AddressItem from '$lib/ui/atoms/addressItem.svelte';
  let { data } = $props();

  const breadcrumbs = [
    { to: '/cart', name: 'Cart' },
    { to: '/checkout', name: 'Checkout', active: true },
    { to: '/payment', name: 'Payment', disabled: true },
  ];
  let formData = $state<{ errors: { [k: string]: any } | null }>({ errors: null });

  let use_my_address = $state<ShippingAddressEntity | null>(null);

  const onSubmitedForm = (parsedCheckout: Pick<CheckoutDetails, 'customer' | 'shipping'>) => {
    checkoutStore.set({ ...$checkoutStore, ...parsedCheckout });

    setTimeout(() => {
      goto('/payment');
    }, 0);
  };

  let shipping_method = $state(SHIPPING_TYPES.FREE);
  let grand_price = $checkoutStore?.total_price;
  let isLoading: boolean = $state(false);

  onMount(() => {
    if ($checkoutStore?.items && !Object.values($checkoutStore.items).length) goto('/cart');
  });
</script>

<Breadcrumbs content={breadcrumbs} class="mx-4 md:mx-6" />

<section class="grid md:grid-cols-[auto,_20rem] gap-4 md:mx-2 my-6 md:my-8">
  <!-- svelte-ignore event_directive_deprecated -->
  <form
    novalidate
    id="checkout_form"
    class="group"
    method="POST"
    action="?/createCheckout"
    use:enhance={(e) => {
      isLoading = true;

      return async ({ result, update }) => {
        isLoading = false;

        if (result.type === 'success' && !result?.data?.success) {
          formData.errors = result?.data?.error as { [k: string]: any } | null;
        }

        if (result.type === 'success' && result?.data?.success) {
          onSubmitedForm(result?.data.data as CreateCheckoutType);
        }

        await update({ reset: false });
      };
    }}
  >
    <div class="sm:border sm:rounded py-2 px-4 md:py-4 w-full space-y-4 md:space-y-6">
      {#if $shippingAddressStore?.length}
        <span class="pb-4 md:pb-6 border-b block">
          <h3 class="text-sm mb-4 font-bold text-gray-700">My Shipping Address</h3>
          <div class="space-y-2">
            {#each $shippingAddressStore as item, i (item.postal_code)}
              <CheckboxCard value={item} id={i + 1} name="my_shipping_address" bind:group={use_my_address}>
                <AddressItem data={{ ...item, country: item.country.country }} />
              </CheckboxCard>

              <!-- <button
                type="button"
                on:click={() => (use_my_address = item)}
                class="rounded p-4 cursor-pointer flex gap-4 my-2 items-center border select-none text-gray-500"
              >
               
              </button> -->
            {/each}
          </div>
        </span>
      {/if}

      <span class="pb-4 md:pb-6 border-b block">
        {#if data.countries}
          <h3 class="text-sm mb-4 font-bold text-gray-700">Select Shipping Country</h3>
          <SelectField
            options={data.countries}
            selected={use_my_address?.country.countryCode || data.countries[0].name}
            name="country"
          />
        {/if}
      </span>

      <div>
        <h3 class="text-sm mb-4 font-bold text-gray-700">Shipping Address</h3>

        {#if use_my_address?.email}
          <ShippingAddress inValid={formData} values={{ ...use_my_address, confirm_password: use_my_address.email }} />
        {:else}
          <ShippingAddress inValid={formData} />
        {/if}
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
                  <span class="text-xs">{item.lead_time.min}-{item.lead_time.max} business days</span>
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

      <Button text="Continue to payment" class="mt-2" type="submit" form="checkout_form" loading={isLoading} />
    </div>
  </div>
</section>

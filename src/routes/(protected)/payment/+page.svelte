<script lang="ts">
  import { checkoutStore } from '$lib/stores/checkout.store';
  import Button from '$lib/ui/atoms/button.svelte';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import { enhance } from '$app/forms';
  import CheckoutItem from '$lib/ui/molecules/checkoutItem.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import PaymentCreditCard from '$lib/ui/organisms/paymentCreditCard.svelte';
  import BillingAddress from '$lib/ui/organisms/billingAddress.svelte';
  import { paymentStore, type PaymentStore } from '$lib/stores/payment.store';
  import { orderStore, type OrderDetails } from '$lib/stores/order.store';
  import { cartStore } from '$lib/stores/cart.store';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import TransactionDetails, { type ITransactionDetails } from '$lib/ui/organisms/transactionDetails.svelte';
  import type { SHIPPING_TYPES } from '../../../constants';

  let currTransaction = $state<ITransactionDetails | null>(null);
  let isTransactionCompleted = $state(false);

  const breadcrumbs = [
    { to: '/cart', name: 'Cart' },
    { to: '/checkout', name: 'Checkout' },
    { to: '/payment', name: 'Payment', active: true },
  ];

  const onSubmitedForm = (parsedPayment: PaymentStore) => {
    window.alert('Payment Completed!');

    $paymentStore = [...$paymentStore, parsedPayment];

    const newOrder = {
      id: crypto.randomUUID(),
      items: $checkoutStore.items,
      totalAmount: parsedPayment.paymentDetails.amount,
      payment: {
        transactionId: parsedPayment.paymentDetails.transactionId,
        status: parsedPayment.paymentDetails.status,
      },
      createdAt: new Date(),
      status: 'pending' as 'pending' | 'shipped' | 'delivered' | 'cancelled' | null,
    };

    $orderStore = [...$orderStore, newOrder];

    checkoutStore.reset();
    cartStore.reset();

    currTransaction = {
      order_id: newOrder.id,
      items: newOrder.items,
      customer: { email: parsedPayment.checkoutDetails.customer.email },
      total_price: parsedPayment.checkoutDetails.total_price,
      credit_card: {
        last_4_digits: parsedPayment.paymentDetails.credit_card.last_4_digits,
      },
      shipping_method: parsedPayment.checkoutDetails.shipping.info.method as SHIPPING_TYPES,
      createdAt: newOrder.createdAt,
    };

    isTransactionCompleted = true;
  };

  let enable_payment: boolean = false;

  onMount(() => {
    if ($checkoutStore?.items && !Object.values($checkoutStore.items).length) goto('/cart');
  });
</script>

<Breadcrumbs content={breadcrumbs} class="mx-4 md:mx-6" />

<section
  class="grid {isTransactionCompleted && currTransaction
    ? ''
    : 'md:grid-cols-[auto,_20rem]'} gap-4 md:mx-2 my-6 md:my-8"
>
  {#if isTransactionCompleted && currTransaction}
    <TransactionDetails data={currTransaction} />
  {:else}
    <form
      id="payment_form"
      method="POST"
      action="?/createPayment"
      use:enhance={(e) => {
        e.formData.append('total_price', $checkoutStore.total_price + '');
        e.formData.append('customer_email', $checkoutStore.customer.email);
        e.formData.append('customer_fullname', $checkoutStore.customer.fullname);
        e.formData.append('shipping_method', $checkoutStore.shipping.info.method);
        e.formData.append('shipping_label', $checkoutStore.shipping.info.label);
        e.formData.append('shipping_price', $checkoutStore.shipping.info.price + '');
        e.formData.append('shipping_lead_time', $checkoutStore.shipping.info.lead_time);

        return async ({ result, update }) => {
          if (result.type === 'success' && result?.data?.success) onSubmitedForm(result?.data.payment as PaymentStore);

          await update();
        };
      }}
    >
      <div class="sm:border sm:rounded py-2 px-4 md:py-4 w-full space-y-4 md:space-y-6">
        <div>
          <h3 class="text-sm mb-4 font-bold text-gray-700">Payment method</h3>

          <PaymentCreditCard />
        </div>

        <div>
          <h3 class="text-sm mb-4 font-bold text-gray-700">Billing Address</h3>

          <BillingAddress />
        </div>
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
            >{$checkoutStore.shipping.info.price.toLocaleString('en-US', {
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
            >{($checkoutStore.total_price + $checkoutStore.shipping.info.price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</span
          >
        </span>

        <Button text="Continue to payment" class="mt-2" type="submit" form="payment_form" disabled={enable_payment} />
      </div>
    </div>
  {/if}
</section>

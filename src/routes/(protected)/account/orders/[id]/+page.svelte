<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { CartItem } from '$lib/stores/cart.store';
  import type { CheckoutDetails } from '$lib/stores/checkout.store';
  import { orderStore, type OrderDetails } from '$lib/stores/order.store';
  import { paymentStore, type PaymentDetails } from '$lib/stores/payment.store';
  import Button from '$lib/ui/atoms/button.svelte';
  import CreditCard from '$lib/ui/atoms/creditCard.svelte';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import Table from '$lib/ui/organisms/table.svelte';
  import TransactionDetails, { type ITransactionDetails } from '$lib/ui/organisms/transactionDetails.svelte';
  import { onMount } from 'svelte';
  import { SHIPPING_TYPES } from '../../../../../constants';
  import type { ProductEntity } from '$lib/stores/product.store';
  import ProductSpecifications, { type SpecificationsType } from '$lib/ui/organisms/productSpecifications.svelte';
  import { calcShippingStatus } from '$lib/helper/shippingStatus';

  let order = $state<OrderDetails | undefined>(undefined);
  let payment = $state<PaymentDetails | undefined>(undefined);
  let transaction = $state<ITransactionDetails | undefined>(undefined);
  let product = $state<ProductEntity | undefined>(undefined);
  let specifications = $state<SpecificationsType | undefined>(undefined);
  let timeline = $state<Array<{ label: string; title: string; description: string; hour: string }> | undefined>(
    undefined
  );

  let shipping = $state<CheckoutDetails['shipping'] | undefined>(undefined);
  let preview_ticket = $state<boolean>(false);

  const tableHeads = ['Product', 'Category', 'Quantity', 'Price', 'Total'];
  let tableBody = $state<Record<number, CartItem> | {}>({});

  const proccessTimeline = (
    purchase_date: Date,
    shipping_method: SHIPPING_TYPES
  ): {
    timeline: {
      label: string;
      title: string;
      description: string;
      hour: string;
    }[];
    orderStatus: 'pending' | 'shipped' | 'delivered';
  } => {
    const shippingStatus = calcShippingStatus({
      purchase_date,
      shipping_method,
    });

    let currentTimeline = [
      {
        label: purchase_date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        title: 'Payment confirmed',
        description: 'The payment for your order has been confirmed.',
        hour: purchase_date.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      },
      {
        label: purchase_date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        title: 'Purchase date',
        description: 'The order was placed successfully.',
        hour: purchase_date.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      },
    ];

    const todayDate = new Date();

    let orderStatus: 'pending' | 'shipped' | 'delivered' = 'pending';

    switch (true) {
      case todayDate < shippingStatus.shipping_date:
        currentTimeline.unshift({
          label: '',
          title: 'Order Shipping',
          description: 'Shipping in progress',
          hour: todayDate.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        });
        break;
      case todayDate >= shippingStatus.shipping_date && todayDate < shippingStatus.delivered_date:
        orderStatus = 'shipped';
        currentTimeline.unshift({
          label: shippingStatus.shipping_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          title: 'Order shipped',
          description: 'Your order has been handed over to the courier.',
          hour: new Date(purchase_date.setMinutes(85)).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        });

        currentTimeline.unshift({
          label: '',
          title: 'Delivery in progress',
          description: 'Shipped completed, delivery in progress',
          hour: todayDate.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        });
        break;
      case todayDate >= shippingStatus.delivered_date:
        orderStatus = 'delivered';

        currentTimeline.unshift({
          label: shippingStatus.shipping_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          title: 'Order shipped',
          description: 'Your order has been handed over to the courier.',
          hour: new Date(purchase_date.setMinutes(43)).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        });

        currentTimeline.unshift({
          label: shippingStatus.delivered_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          title: 'Order delivered',
          description: 'Your order has been delivered successfully.',
          hour: new Date(purchase_date.setMinutes(80)).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        });
        break;
      default:
    }

    return { timeline: currentTimeline, orderStatus };
  };

  $effect(() => {
    if (product) {
      specifications = {
        general: [
          { key: 'Name', value: product?.title || 'Lorem ipsum' },
          {
            key: 'Price',
            value:
              product?.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }) || 'Lorem ipsum',
          },
          { key: 'Stock', value: product?.stock || 'Lorem ipsum' },
          { key: 'Brand', value: product?.specifications?.brand || 'Lorem ipsum' },
          { key: 'Model', value: product?.specifications?.model || 'Lorem ipsum' },
          { key: 'Category', value: product?.category?.name || 'Lorem ipsum' },
        ],
      };
    }
  });

  onMount(() => {
    let auxOrder = $orderStore?.find((i) => i.id === $page.params.id) as OrderDetails;

    if (!auxOrder) goto('/account/orders');

    let auxPayment = $paymentStore.find((i) => i.paymentDetails.transactionId === auxOrder?.payment.transactionId);
    payment = auxPayment?.paymentDetails;

    shipping = auxPayment?.checkoutDetails.shipping;

    transaction = {
      order_id: auxOrder.id,
      items: auxOrder.items,
      customer: { email: auxPayment?.checkoutDetails.customer.email as string },
      total_price: auxPayment?.checkoutDetails.total_price as number,
      credit_card: {
        last_4_digits: auxPayment?.paymentDetails.credit_card.last_4_digits as string,
      },
      shipping_method: auxPayment?.checkoutDetails.shipping.info.method as SHIPPING_TYPES,
      createdAt: new Date(auxOrder.createdAt as Date),
    };

    const OrderDate = new Date(auxOrder.createdAt as Date);

    let auxTimeline = proccessTimeline(OrderDate, auxPayment?.checkoutDetails.shipping.info.method as SHIPPING_TYPES);
    timeline = auxTimeline.timeline;

    tableBody = auxOrder.items;

    orderStore.update((order) => {
      order.map((i) => {
        if (i.id === auxOrder.id) {
          i.status = auxTimeline.orderStatus;
          return i;
        }
      });

      return order;
    });

    order = auxOrder;
  });
</script>

<div class="w-full">
  <div class="flex justify-between bg-white py-4 sticky top-[4rem] z-10">
    <button
      class="flex items-center gap-2 p-2 border font-medium text-xs text-gray-800 rounded-md hover:bg-gray-100"
      onclick={() => goto('/account/orders')}><Icon name="arrow-left" class="stroke-gray-800 stroke-1" /></button
    >

    <Button
      on:click={() => (preview_ticket = !preview_ticket)}
      variant="ghost"
      class="max-sm:text-xs font-light hover:text-gray-500 !w-fit"
      text={preview_ticket ? 'Hidde Ticket' : 'Preview Ticket'}
    />
  </div>

  {#if preview_ticket && transaction && !product}
    <div
      class="fixed bg-white h-[calc(100vh_-_2rem)] right-0 top-0 z-10 m-4 p-4 overflow-y-scroll border-2 rounded-md overscroll-contain no-scrollbar w-[30rem]"
    >
      <button onclick={() => (preview_ticket = !preview_ticket)} class="absolute top-0 right-0">
        <Icon name="x-mark" class="stroke-2 p-2 size-8 stroke-gray-500 hover:stroke-gray-800 cursor-pointer" /></button
      >

      <TransactionDetails data={transaction} preview />
    </div>
  {/if}

  {#if product}
    <div
      class="fixed bg-white h-[calc(100vh_-_2rem)] right-0 top-0 z-10 m-4 p-4 overflow-y-scroll border-2 rounded-md overscroll-contain no-scrollbar w-[30rem]"
    >
      <button onclick={() => (product = undefined)} class="absolute top-0 right-0">
        <Icon name="x-mark" class="stroke-2 p-2 size-8 stroke-gray-500 hover:stroke-gray-800 cursor-pointer" /></button
      >
      <div class="space-y-4">
        <h3 class="text-sm sm:text-lg font-bold text-gray-700">{product.title}</h3>
        <img
          class="bg-gray-100 object-contain rounded-md max-h-20"
          src={product.images[0]}
          alt="{product.title} image"
        />

        <p class="text-xs text-gray-600">{product.description}</p>

        {#if specifications}
          <div>
            <h3 class="text-sm font-semibold text-gray-700">Full Specification</h3>

            <div>
              {#each specifications.general as item, i}
                <div class="text-xs p-2 flex justify-between {i % 2 !== 0 ? 'bg-gray-100' : 'bg-white rounded-md'}">
                  <span class="text-gray-800 font-medium">{item.key}</span><span class="text-gray-500"
                    >{item.value}</span
                  >
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <div class="space-y-4">
    <div class="border-2 rounded-md size-full p-4">
      <h3 class="text-sm mb-4 font-bold text-gray-700">Order Items</h3>

      <Table {tableHeads}>
        {#each Object.values(tableBody) as { quantity, item }}
          <tr class="transition-colors bg-white border-b cursor-pointer group" onclick={() => (product = item)}>
            <th
              scope="row"
              class="transition-colors flex items-center pl-2 py-4 font-medium text-gray-900 group-hover:bg-gray-50 whitespace-nowrap"
              ><img src={item.images[0]} alt="{item.title} image" class="object-cover size-6 rounded-md mr-2" />
              {item.title}
            </th>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> {item.category.name} </td>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> x{quantity} </td>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> ${item.price} </td>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> ${item.price * quantity} </td>
          </tr>
        {/each}
      </Table>
    </div>

    <div class="flex gap-4">
      {#if payment}
        <div class="border-2 rounded-md size-full p-4">
          <h3 class="text-sm mb-4 font-bold text-gray-700">Payment Details</h3>
          <div>
            <CreditCard credit_card={payment?.credit_card} />
          </div>
        </div>
      {/if}

      {#if shipping}
        <div class="border-2 rounded-md w-full p-4">
          <h3 class="text-sm mb-4 font-bold text-gray-700">Shipping Details</h3>
          <div class="space-y-2">
            <p class="text-xs text-gray-500">
              <span class="text-sm font-medium text-gray-600">Method :</span>
              {shipping.info.label}
            </p>
            <p class="text-xs text-gray-500">
              <span class="text-sm font-medium text-gray-600">Lead Time :</span>
              {shipping.info.lead_time.min}-{shipping.info.lead_time.max} business days
            </p>
            <p class="text-xs text-gray-500">
              <span class="text-sm font-medium text-gray-600">Price :</span>
              {parseFloat(shipping.info.price + '').toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>

            <div class="text-xs text-gray-500">
              <span class="flex gap-1 items-baseline text-xs text-gray-500 flex-wrap">
                <span class="text-sm font-medium text-gray-600">Address :</span>
                <p>Argentina</p>
                <span>-</span>
                <p>Entre Rios</p>
                <span>-</span>
                <p>Concordia</p>
                <span>-</span>
                <p>Chile 4687</p>
                <span>-</span>
                <p>E3201</p>
              </span>
            </div>
          </div>
        </div>
      {/if}
    </div>

    {#if timeline}
      <div class="border-2 rounded-md size-full p-4">
        <h3 class="text-sm mb-4 font-bold text-gray-700">Timeline</h3>

        <div>
          <ol class="relative border-s border-gray-200">
            {#each timeline as item}
              <li class="mb-8 ms-4">
                <div class="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <div class="flex justify-between">
                  <div>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-700">{item.label}</time>
                    <h3 class="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p class="mb-4 text-base font-normal text-gray-500">{item.description}</p>
                  </div>
                  <time class="mt-4 text-sm font-normal leading-none text-gray-700">{item.hour}</time>
                </div>
              </li>
            {/each}
          </ol>
        </div>
      </div>
    {/if}
  </div>
</div>

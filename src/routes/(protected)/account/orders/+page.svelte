<script>
  import { goto } from '$app/navigation';
  import { orderStore } from '$lib/stores/order.store';
  import Table from '$lib/ui/organisms/table.svelte';

  const tableHeads = ['Total items', 'Grand total', 'Payment status', 'Shipping status', 'Order date'];
  let tableBody = $state($orderStore);
  let styleOrderStatus = {
    pending: 'text-gray-500',
    shipped: 'text-blue-500',
    delivered: 'text-green-500',
    cancelled: 'text-red-500',
  };
  let stylePaymentStatus = {
    pending: 'text-gray-500',
    completed: 'text-green-500',
    failed: 'text-red-500',
  };
</script>

<div class="w-full">
  <h2 class="py-4 bg-white font-semibold text-lg">Orders and Purchases</h2>

  <div class="">
    <Table {tableHeads} class="[&_thead]:top-16">
      {#if tableBody?.length}
        {#each tableBody.reverse() as item}
          <!-- svelte-ignore event_directive_deprecated -->
          <tr
            on:click={() => goto('/account/orders/' + item.id)}
            class="transition-colors bg-white border-b cursor-pointer group"
          >
            <td class="transition-colors p-2 group-hover:bg-gray-50"> {Object.values(item.items).length} </td>
            <td class="transition-colors p-2 group-hover:bg-gray-50"> ${item.grand_total} </td>
            <td
              class="transition-colors p-2 group-hover:bg-gray-50 {stylePaymentStatus[
                item.payment.status || 'pending'
              ]}"
            >
              {item.payment.status}
            </td>
            <td class="transition-colors p-2 group-hover:bg-gray-50 {styleOrderStatus[item.status || 'pending']}">
              {item.status}
            </td>
            <td class="transition-colors p-2 group-hover:bg-gray-50">
              {new Date(item.createdAt || new Date()).toLocaleDateString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}</td
            >
          </tr>
        {/each}
      {/if}
    </Table>
  </div>
</div>

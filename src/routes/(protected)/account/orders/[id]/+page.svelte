<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { orderStore, type OrderDetails } from '$lib/stores/order.store';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import { onMount } from 'svelte';

  let order = $state<OrderDetails | undefined>(undefined);

  onMount(() => {
    order = $orderStore?.find((i) => i.id === $page.params.id);
    if (!order) goto('/account/orders');
  });
</script>

<div class="w-full">
  <div class="bg-white py-4 sticky top-[4rem]">
    <button
      class="flex items-center gap-2 p-2 border font-medium text-xs text-gray-800 rounded-md hover:bg-gray-100"
      onclick={() => goto('/account/orders')}><Icon name="arrow-left" class="stroke-gray-800 stroke-1" /></button
    >
  </div>

  <h2 class="font-medium text-gray-700">{order?.id}</h2>
</div>

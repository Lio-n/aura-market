<script>
  import { page } from '$app/stores';
  import { userStore } from '$lib/stores/user.store';
  import Icon from '$lib/ui/atoms/icon.svelte';

  $: currPage = $page.url.pathname;
  let stylesByActualPage = 'text-gray-900 bg-gray-100 !border-blue-500';
</script>

<div class="mr-4 border-r ml-12 pr-4 w-64">
  <div class="sticky top-[5rem]">
    <div class="flex items-center gap-4 border-b mb-4 pb-4">
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img
        src={$userStore?.avatar}
        alt="Avatar"
        class="text-center bg-gray-100 text-xs leading-[48px] rounded-full size-12"
      />

      <div>
        <span class="text-sm text-gray-500">Hi, </span>
        <p class="text-lg font-bold text-gray-800">{$userStore?.name}</p>
      </div>
    </div>

    <nav class="space-y-2">
      <a
        class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 border-l-2 border-transparent {currPage ===
        '/account/my-profile'
          ? stylesByActualPage
          : ''}"
        href="/account/my-profile"
        ><Icon name="user" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />My
        Profile</a
      >

      <a
        class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 border-l-2 border-transparent {currPage.includes(
          'orders'
        )
          ? stylesByActualPage
          : ''}"
        href="/account/orders"
        ><Icon name="ticket" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />Orders
        and Purchases</a
      >

      <a
        class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 border-l-2 border-transparent {currPage ===
        '/account/payment-methods'
          ? stylesByActualPage
          : ''}"
        href="/account/payment-methods"
        ><Icon
          name="credit-card"
          class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950"
        />Payment Methods</a
      >

      <a
        class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 border-l-2 border-transparent {currPage ===
        '/account/shipping-addresses'
          ? stylesByActualPage
          : ''}"
        href="/account/shipping-addresses"
        ><Icon
          name="map-pin"
          class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950"
        />Shipping Addresses</a
      >

      <a
        class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 border-l-2 border-transparent {currPage ===
        '/account/settings'
          ? stylesByActualPage
          : ''}"
        href="/account/settings"
        ><Icon
          name="gear"
          class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950"
        />Settings</a
      >
    </nav>
  </div>
</div>

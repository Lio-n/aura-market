<script lang="ts">
  import { shippingAddressStore, type ShippingAddressEntity } from '$lib/stores/shippingAddress.store';
  import AddressItem from '$lib/ui/atoms/addressItem.svelte';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import CreateShippingAddress from '$lib/ui/organisms/createShippingAddress.svelte';
  import ShippingAddressPreview from '$lib/ui/organisms/shippingAddressPreview.svelte';

  let add_address = $state(false);
  let preview_address = $state(false);
  let selectedAddress = $state<ShippingAddressEntity | undefined>(undefined);
</script>

<div class="ml-4">
  <h2 class="py-4 bg-white font-semibold text-lg sticky top-[4rem]">Shipping Addresses</h2>
  <div class="">
    {#if !add_address && !preview_address}
      <button
        class="flex items-center gap-2 p-2 border font-medium text-xs text-gray-800 rounded-md hover:bg-gray-100"
        onclick={() => (add_address = !add_address)}
        ><Icon name="plus" class="stroke-gray-800 stroke-1" /> Add Address</button
      >
    {/if}

    {#if add_address}
      <button
        class="flex items-center gap-2 p-2 border font-medium text-xs text-gray-800 rounded-md hover:bg-gray-100"
        onclick={() => (add_address = !add_address)}><Icon name="arrow-left" class="stroke-gray-800 stroke-1" /></button
      >

      <div>
        <CreateShippingAddress onClose={() => (add_address = !add_address)} />
      </div>
    {/if}

    {#if preview_address && selectedAddress}
      <button
        class="flex items-center gap-2 p-2 border font-medium text-xs text-gray-800 rounded-md hover:bg-gray-100"
        onclick={() => (preview_address = !preview_address)}
        ><Icon name="arrow-left" class="stroke-gray-800 stroke-1" /></button
      >

      <div>
        <ShippingAddressPreview
          data={selectedAddress}
          onClose={() => {
            preview_address = !preview_address;
            selectedAddress = undefined;
          }}
        />
      </div>
    {/if}

    <div class="space-y-2 mt-4">
      {#if $shippingAddressStore?.length && !add_address && !preview_address}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        {#each $shippingAddressStore as item (item.postal_code)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div
            class="rounded p-4 cursor-pointer flex gap-4 items-center border select-none text-gray-500 hover:bg-gray-100"
            onclick={() => {
              preview_address = !preview_address;
              selectedAddress = item;
            }}
          >
            <AddressItem data={{ ...item, country: item.country.country }} />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

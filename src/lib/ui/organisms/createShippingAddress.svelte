<script lang="ts">
  import { enhance } from '$app/forms';
  import SelectCountry from '$lib/components/selectCountry.svelte';
  import { shippingAddressStore, type ShippingAddressEntity } from '$lib/stores/shippingAddress.store';
  import Button from '$lib/ui/atoms/button.svelte';
  import ShippingAddress from '$lib/ui/organisms/shippingAddress.svelte';

  let { onClose }: { onClose?: () => void } = $props();

  let formData = $state<{ errors: { [k: string]: any } | null }>({ errors: null });
  let isLoading: boolean = $state(false);

  const onSubmitedForm = (parsedAddress: ShippingAddressEntity) => {
    shippingAddressStore.update((i) => {
      i?.push(parsedAddress);
      return i;
    });

    onClose && onClose();
  };
</script>

<form
  novalidate
  class="group"
  method="POST"
  action="?/createShippingAddress"
  use:enhance={(e) => {
    isLoading = true;

    return async ({ result, update }) => {
      isLoading = false;

      if (result.type === 'success' && !result?.data?.success) {
        formData.errors = result?.data?.error as { [k: string]: any } | null;
      }

      if (result.type === 'success' && result?.data?.success) {
        formData.errors = null;
        onSubmitedForm(result?.data.data as ShippingAddressEntity);
      }

      await update({ reset: false });
    };
  }}
>
  <SelectCountry name="country" class="mb-4" />

  <ShippingAddress inValid={formData}>
    <Button text="Save" type="submit" loading={isLoading} />
  </ShippingAddress>
</form>

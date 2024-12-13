<script lang="ts">
  import { enhance } from '$app/forms';
  import SelectCountry from '$lib/components/selectCountry.svelte';
  import { shippingAddressStore, type ShippingAddressEntity } from '$lib/stores/shippingAddress.store';
  import Button from '$lib/ui/atoms/button.svelte';
  import ShippingAddress from '$lib/ui/organisms/shippingAddress.svelte';

  let { data, onClose }: { data: ShippingAddressEntity; onClose?: () => void } = $props();

  let formData = $state<{ errors: { [k: string]: any } | null }>({ errors: null });
  let isLoading: boolean = $state(false);

  const handleDeleteItem = () => {
    if (!$shippingAddressStore?.length) return;

    $shippingAddressStore = [...$shippingAddressStore.filter((item) => item.id !== data.id)];

    onClose && onClose();
  };

  const onSubmitedForm = (parsedAddress: ShippingAddressEntity) => {
    shippingAddressStore.update((i) => {
      if (!i) return null;

      let aux = [...i.filter((item) => item.id !== data.id)];

      aux?.push({ ...parsedAddress, id: data.id });
      return aux;
    });

    onClose && onClose();
  };
</script>

<div>
  <div class="my-4 flex items-center justify-between">
    <h3 class="font-semibold text-gray-950">Edit Address</h3>

    <div class="flex">
      <Button
        text="Delete"
        class="!w-fit px-4 text-red-600 hover:text-red-500"
        variant="ghost"
        on:click={handleDeleteItem}
      />
    </div>
  </div>

  <form
    novalidate
    class="group"
    method="POST"
    action="?/updateShippingAddress"
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
    <SelectCountry name="country" class="mb-4" selected={data.country.countryCode} />

    <ShippingAddress inValid={formData} values={{ ...data, confirm_password: data.email }}>
      <Button text="Save" type="submit" loading={isLoading} />
    </ShippingAddress>
  </form>
</div>

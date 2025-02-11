<script lang="ts">
  import Button from '../atoms/button.svelte';
  import TextField from '../atoms/textField.svelte';
  import DraggableModal from '$lib/components/draggableModal.svelte';
  import { categoryStore, productsInventoryStore, type ProductInventory } from '$lib/stores/product.store';
  import SelectField from '../atoms/selectField.svelte';
  import ImagesUpload from '$lib/components/imagesUpload.svelte';
  import { enhance } from '$app/forms';

  let { onClose }: { onClose: () => void } = $props();
  let uploadedImages: Array<string> = $state([]);
  let formData = $state<{ errors: { [k: string]: any } | null }>({ errors: null });

  const selectOptions: { value: string; name: string }[] = [
    { value: $categoryStore.Clothes.name, name: $categoryStore.Clothes.name },
    { value: $categoryStore.Electronics.name, name: $categoryStore.Electronics.name },
    { value: $categoryStore.Miscellaneous.name, name: $categoryStore.Miscellaneous.name },
    { value: $categoryStore.Shoes.name, name: $categoryStore.Shoes.name },
  ];

  const onSubmitedForm = (parsedProduct: ProductInventory) => {
    $productsInventoryStore = [parsedProduct, ...$productsInventoryStore];
    window.alert('New Item Created!');
    onClose();
  };
</script>

<DraggableModal
  resize_container="container-create-product-preview"
  resize_handler="resize-create-product-preview"
  {onClose}
>
  <h3 class="text-2xl font-semibold text-gray-950 mt-8 ml-8">Add Product</h3>

  <div class="h-full m-8">
    <form
      novalidate
      class="w-full mb-8 group"
      method="POST"
      action="?/createProduct"
      use:enhance={(e) => {
        return async ({ result, update }) => {
          if (result.type === 'success' && !result?.data?.success) {
            formData.errors = result?.data?.error as { [k: string]: any } | null;
          }

          if (result.type === 'success' && result?.data?.success) {
            onSubmitedForm(result?.data.product as ProductInventory);
          }
          await update({ reset: false });
        };
      }}
    >
      <div class="space-y-4">
        <div>
          <span class="font-medium text-lg"> Description </span>
          <div class="mt-2 space-y-2 p-3 border-2 rounded">
            <TextField name="title" label="Title" required isInvalid={formData.errors?.title} />
            <TextField
              name="description"
              label="Description"
              type="textarea"
              required
              isInvalid={formData.errors?.description}
            />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Images </span>
          <div class="mt-2 space-y-2 p-3 border-2 rounded">
            <ImagesUpload bind:uploadedImages />
            <input type="hidden" name="uploadedImages" value={JSON.stringify(uploadedImages)} />
            {#if formData.errors?.images}
              <span class="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {formData.errors?.images}
              </span>
            {/if}
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Category </span>
          <div class="mt-2 p-3 border-2 rounded">
            <SelectField options={selectOptions} name="category" required />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Inventory </span>
          <div class="mt-2 h-40 p-3 border-2 rounded h-fit">
            <TextField name="stock" label="Stock" type="number" required isInvalid={formData.errors?.stock} />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Specifications </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid grid-cols-2 h-fit">
            <TextField name="brand" label="Brand" required isInvalid={formData.errors?.brand} />
            <TextField name="model" label="Model" required isInvalid={formData.errors?.model} />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Pricing </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid h-fit">
            <TextField name="price" label="Price" type="currency" required isInvalid={formData.errors?.price} />
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <Button
          text="Add Product"
          class="mt-4 !w-fit px-6 py-3 group-invalid:pointer-events-none group-invalid:opacity-30"
          type="submit"
        />
      </div>
    </form>
  </div>
</DraggableModal>

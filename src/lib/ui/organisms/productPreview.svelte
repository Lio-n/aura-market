<script lang="ts">
  import DraggableModal from '$lib/components/draggableModal.svelte';
  import TextField from '../atoms/textField.svelte';
  import Button from '../atoms/button.svelte';
  import { categoryStore, productsInventoryStore, type ProductInventory } from '$lib/stores/product.store';
  import SelectField from '../atoms/selectField.svelte';
  import ImagesUpload from '$lib/components/imagesUpload.svelte';
  import { enhance } from '$app/forms';

  let { product, onClose }: { product: ProductInventory; onClose: () => void } = $props();
  let in_edit = $state(false);
  let uploadedImages: Array<string> = $state(product.images);

  const selectOptions: { value: string; name: string }[] = [
    { value: $categoryStore.Clothes.name, name: $categoryStore.Clothes.name },
    { value: $categoryStore.Electronics.name, name: $categoryStore.Electronics.name },
    { value: $categoryStore.Miscellaneous.name, name: $categoryStore.Miscellaneous.name },
    { value: $categoryStore.Shoes.name, name: $categoryStore.Shoes.name },
  ];

  const onSubmitedForm = (parsedProduct: ProductInventory) => {
    $productsInventoryStore = [parsedProduct, ...$productsInventoryStore.filter((item) => item.id !== product.id)];

    product = parsedProduct;
    window.alert('Item Updated!');

    in_edit = false;
  };

  const handleDeleteItem = () => {
    $productsInventoryStore = [...$productsInventoryStore.filter((item) => item.id !== product.id)];
    onClose();
  };
</script>

<DraggableModal resize_container="container-product-preview" resize_handler="resize-product-preview" {onClose}>
  <div class="mt-8 mx-8 flex justify-between">
    <h3 class="text-2xl font-semibold text-gray-950">{in_edit ? 'Edit' : 'Preview'} Product</h3>

    <div class="flex gap-2">
      {#if in_edit}
        <Button
          on:click={handleDeleteItem}
          text="Delete"
          class="!w-fit px-4 text-red-500 hover:text-red-600"
          variant="ghost"
        />
      {/if}

      <Button
        on:click={() => (in_edit = !in_edit)}
        text={in_edit ? 'Cancel Edit' : 'Edit'}
        icon="pencil"
        class="!w-fit px-4"
        variant="outline"
      />
    </div>
  </div>

  <form
    method="POST"
    action="?/updateProduct"
    use:enhance={(e) => {
      return async ({ result, update }) => {
        if (result.type === 'success' && result?.data?.success)
          onSubmitedForm({ ...product, ...(result?.data.product as ProductInventory) });

        await update({
          reset: false,
        });
      };
    }}
    class="h-full m-8"
  >
    <div class="w-full mb-8">
      <div class="space-y-4">
        <div>
          <span class="font-medium text-base"> Description </span>
          <div class="mt-2 space-y-2 p-3 border-2 rounded">
            <TextField name="title" label="Title" value={product.title} preview={!in_edit} />
            <TextField
              name="description"
              label="Description"
              type="textarea"
              value={product.description}
              preview={!in_edit}
            />
          </div>
        </div>

        <div>
          <span class="font-medium text-base"> Images </span>
          <div class="mt-2 p-3 border-2 rounded {!in_edit ? 'flex min-h-40 max-h-52 space-x-2' : 'space-y-2'}">
            {#if !in_edit}
              {#each product.images as item}
                <img src={item} alt="" class="rounded object-cover w-full" />
              {/each}
            {:else}
              <ImagesUpload bind:uploadedImages defaultImages={product.images} />
              <input type="hidden" name="uploadedImages" value={JSON.stringify(uploadedImages)} />
            {/if}
          </div>
        </div>

        <div>
          <span class="font-medium text-base"> Category </span>
          <div class="mt-2 flex p-3 border-2 rounded">
            <SelectField options={selectOptions} name="category" selected={product.category.name} preview={!in_edit} />
          </div>
        </div>

        <div>
          <span class="font-medium text-base"> Inventory </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid grid-cols-2 h-fit">
            <TextField name="stock" label="Stock" type="number" value={product.stock} preview={!in_edit} />
            <TextField name="sku" label="SKU" value={product.SKU} preview />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Specifications </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid grid-cols-2 h-fit">
            <TextField
              name="specification_brand"
              label="Brand"
              value={product.specifications.brand}
              preview={!in_edit}
            />
            <TextField
              name="specification_model"
              label="Model"
              value={product.specifications.model}
              preview={!in_edit}
            />
          </div>
        </div>

        <div>
          <span class="font-medium text-base"> Pricing </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid h-fit">
            <TextField name="price" label="Price" type="currency" value={product.price} preview={!in_edit} />
          </div>
        </div>
      </div>
    </div>

    {#if in_edit}
      <div class="flex justify-end mt-4">
        <Button text="Save Product" class="mt-4 !w-fit px-6 py-3" />
      </div>
    {/if}
  </form>
</DraggableModal>

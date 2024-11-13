<script lang="ts">
  import Button from '../atoms/button.svelte';
  import TextField from '../atoms/textField.svelte';
  import { randomNumbers, randomSKU } from '$lib/helper/randomSKU';
  import DraggableModal from '$lib/components/draggableModal.svelte';
  import { productsInventoryStore, type ProductInventory } from '$lib/stores/product.store';

  let { onClose }: { onClose: () => void } = $props();
  let SKU_VALUE = randomSKU();

  const handleSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries()) as unknown as ProductInventory;

    const parsedProduct: ProductInventory = {
      id: randomNumbers(),
      title: formDataObject.title,
      images: ['/products/clothes.jpeg'],
      description: formDataObject.description,
      category: {
        id: 1,
        name: 'Laptop',
        image: '/products/clothes.jpeg',
      },
      SKU: SKU_VALUE,
      stock: formDataObject.stock,
      price: formDataObject.price,
    };

    $productsInventoryStore = [parsedProduct, ...$productsInventoryStore];

    window.alert('New Item Created!');
    onClose();
  };

  console.log('productsInventoryStore : ', $productsInventoryStore);
</script>

<DraggableModal
  resize_container="container-create-product-preview"
  resize_handler="resize-create-product-preview"
  {onClose}
>
  <h3 class="text-2xl font-semibold text-gray-950 mt-8 ml-8">Add Product</h3>

  <div class="h-full m-8">
    <form on:submit|preventDefault={handleSubmit} class="w-full mb-8">
      <div class="space-y-4">
        <div>
          <span class="font-medium text-lg"> Description </span>
          <div class="mt-2 space-y-2 p-3 border-2 rounded">
            <TextField name="title" label="Title" />
            <TextField name="description" label="Description" type="textarea" />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Images </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded flex">
            <div class="h-full w-80 bg-blue-200 rounded"></div>

            <div class="h-full w-40 bg-red-200 rounded"></div>

            <div class="size-full bg-violet-200 rounded"></div>
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Category </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded flex h-fit">Multi select tags</div>
        </div>

        <div>
          <span class="font-medium text-lg"> Inventory </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid grid-cols-2 h-fit">
            <TextField name="stock" label="Stock" type="number" />
            <TextField name="sku" label="SKU" value={SKU_VALUE} disabled />
          </div>
        </div>

        <div>
          <span class="font-medium text-lg"> Pricing </span>
          <div class="mt-2 h-40 space-x-2 p-3 border-2 rounded grid h-fit">
            <TextField name="price" label="Pricing" type="currency" />
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <Button text="Add Product" class="mt-4 !w-fit px-6 py-3" />
      </div>
    </form>
  </div>
</DraggableModal>

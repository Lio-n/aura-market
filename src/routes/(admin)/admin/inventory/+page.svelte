<script lang="ts">
  import type { ProductEntity, ProductInventory } from '$lib/stores/product.store.js';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import ProductPreview from '$lib/ui/organisms/productPreview.svelte';
  import Table from '$lib/ui/organisms/table.svelte';
  import { draggable } from '@neodrag/svelte';
  import { onMount } from 'svelte';

  let { data } = $props();
  let showDetails = $state(false);
  let selectedProduct = $state<ProductInventory | undefined>(undefined);

  const onSelectProduct = (id: number) => {
    selectedProduct = data.products.find((e) => e.id === id);
    console.log(selectedProduct);
  };

  const toggleInventoryDetails = () => (showDetails = !showDetails);

  const tableHeads = ['Product', 'Category', 'SKU', 'Stock', 'Price'];
  const tableBody: Array<ProductInventory> = data.products;
  const inventoryDetails = [
    {
      title: 'Total Inventory volumen',
      amount: '1.520',
    },
    {
      title: 'Inventory value',
      amount: '$1.9m',
    },
    {
      title: 'Inventory turnover',
      amount: '6,62',
    },
  ];
</script>

<div class="flex relative">
  <div class="border-r-[1px] w-full pr-4">
    <header class="pt-8 pb-4 border-b-[1px] w-full relative z-10">
      <span class="flex justify-between items-center mb-4">
        <h1 class="text-lg sm:text-2xl font-semibold text-gray-950">Inventory</h1>
        <!-- svelte-ignore event_directive_deprecated -->
        <button on:click={toggleInventoryDetails} class="md:hidden h-fit p-2"
          ><Icon name="bar-filter" class="transition-all {showDetails ? 'rotate-180' : ''}" /></button
        >
      </span>

      <div
        class="{showDetails
          ? 'block'
          : 'max-md:hidden'} max-md:absolute max-md:w-full max-md:bg-white grid max-sm:grid-rows-3 sm:grid-cols-3 gap-2 sm:gap-4 max-md:pb-4"
      >
        {#each inventoryDetails as item}
          <div class="bg-gray-100 rounded-md py-2 sm:py-4 px-4 sm:px-6">
            <p class="text-gray-950 font-medium text-sm sm:text-xl">{item.amount}</p>
            <span class="text-gray-700 text-xs">{item.title}</span>
          </div>
        {/each}
      </div>
    </header>

    <section class="py-4 grid max-h-[80vh] md:max-h-[60vh] xl:max-h-full overflow-auto">
      <Table {tableHeads}>
        {#each tableBody as item}
          <tr
            class="transition-colors bg-white border-b cursor-pointer group"
            on:click={() => onSelectProduct(item.id)}
          >
            <th
              scope="row"
              class="transition-colors flex items-center pl-2 py-4 font-medium text-gray-900 group-hover:bg-gray-50 whitespace-nowrap"
              ><img src={item.images[0]} alt="{item.title} image" class="size-6 rounded-md mr-2" /> {item.title}
            </th>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> {item.category.name} </td>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> {item.SKU} </td>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> {item.stock} </td>
            <td class="transition-colors pl-2 py-4 group-hover:bg-gray-50"> {item.price} </td>
          </tr>
        {/each}
      </Table>
    </section>
  </div>

  <ProductPreview product={selectedProduct} />

  <div class="max-md:hidden border-l-[1px] w-80"></div>
</div>

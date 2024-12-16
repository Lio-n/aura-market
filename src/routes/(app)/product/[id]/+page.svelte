<script lang="ts">
  import { page } from '$app/stores';
  import { productsStore, type ProductEntity } from '$lib/stores/product.store';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import ProductSpecifications from '$lib/ui/organisms/productSpecifications.svelte';
  import ProductOverview from '$lib/ui/template/productOverview.svelte';

  let { data } = $props();
  const GetLocalProductById = (_id: string): ProductEntity | null => {
    if (!$page.params.id) return null;

    return $productsStore.find((i) => i.id === parseFloat(_id)) as ProductEntity | null;
  };

  let product: ProductEntity | null = $state(
    (data.product as ProductEntity) ? (data.product as ProductEntity) : GetLocalProductById($page.params.id)
  );

  const specifications = $derived({
    general: [
      { key: 'Name', value: product?.title || 'Lorem ipsum' },
      { key: 'Price', value: product?.price || 'Lorem ipsum' },
      { key: 'Stock', value: product?.stock || 'Lorem ipsum' },
      { key: 'Brand', value: product?.specifications.brand || 'Lorem ipsum' },
      { key: 'Model', value: product?.specifications.model || 'Lorem ipsum' },
      { key: 'Category', value: product?.category.name || 'Lorem ipsum' },
    ],
  });

  const breadcrumbs = $derived([
    { to: `/product/category/${product?.category.name}`, name: product?.category.name || '' },
    { to: null, name: product?.title || '' },
  ]);
</script>

{#if !product}
  <div class="h-80 grid place-items-center">
    <h2 class="font-medium text-gray-700">No product found</h2>
  </div>
{:else}
  <div class="mx-4">
    <Breadcrumbs content={breadcrumbs} />

    <ProductOverview {product} />

    <ProductSpecifications {specifications} />
  </div>
{/if}

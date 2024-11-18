<script lang="ts">
  import { page } from '$app/stores';
  import { ProductService } from '$lib/services/productService';
  import { productsStore, type ProductEntity } from '$lib/stores/product.store';
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import type { SpecificationsType } from '$lib/ui/organisms/productSpecifications.svelte';
  import ProductSpecifications from '$lib/ui/organisms/productSpecifications.svelte';
  import ProductOverview from '$lib/ui/template/productOverview.svelte';

  let isLoading = true;
  let data: ProductEntity | null = $state(null);

  const GetProductById = async (_id: string) => {
    const localProduct = $productsStore.find((i) => i.id === parseInt(_id));
    console.log('re-render : ', localProduct);

    if (!localProduct) {
      const res = await ProductService.getById(_id);
      isLoading = false;

      if (!res?.data?.specifications?.brand) {
        data = {
          specifications: {
            brand: 'Lorem ipsum',
            model: 'Lorem ipsum',
          },
          ...res?.data,
        } as ProductEntity;
      } else {
        data = res?.data;
      }
    } else {
      data = localProduct;
    }
  };

  const specifications = $derived({
    general: [
      { key: 'Name', value: data?.title || 'Lorem ipsum' },
      { key: 'Price', value: data?.price || 'Lorem ipsum' },
      { key: 'Stock', value: data?.stock || 'Lorem ipsum' },
      { key: 'Brand', value: data?.specifications.brand || 'Lorem ipsum' },
      { key: 'Model', value: data?.specifications.model || 'Lorem ipsum' },
      { key: 'Category', value: data?.category.name || 'Lorem ipsum' },
    ],
  });

  const breadcrumbs = $derived([
    { to: `/product/category/${data?.category?.name}`, name: data?.category.name || '' },
    { to: null, name: data?.title || '' },
  ]);

  $effect(() => {
    GetProductById($page.params.id || '');
  });
</script>

{#if !data?.title}
  <div class="h-80 grid place-items-center">
    <h2 class="font-medium text-gray-700">No product found</h2>
  </div>
{:else}
  <div class="mx-4">
    <Breadcrumbs content_breadcrumbs={breadcrumbs} />

    <ProductOverview product={data as unknown as ProductEntity} />

    <ProductSpecifications {specifications} />
  </div>
{/if}

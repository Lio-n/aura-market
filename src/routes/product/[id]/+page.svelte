<script lang="ts">
  import Breadcrumbs from '$lib/ui/molecules/breadcrumbs.svelte';
  import type { SpecificationsType } from '$lib/ui/organisms/productSpecifications.svelte';
  import ProductSpecifications from '$lib/ui/organisms/productSpecifications.svelte';
  import ProductOverview from '$lib/ui/template/productOverview.svelte';

  let { data } = $props();

  const specifications: SpecificationsType = {
    general: [
      { Brand: 'Lorem ipsum' },
      { Model: data.product.title || 'Lorem ipsum' },
      { Price: data.product.price || 'Lorem ipsum' },
      {
        'Release date': new Date(data.product.creationAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        }),
      },
      { 'Model Number': 'E10LRF9' },
    ],
  };

  const breadcrumbs: Array<{ to: string | null; name: string }> = [
    { to: `/category/${data.product.category.name}`, name: data.product.category.name },
    { to: null, name: data.product.title },
  ];
</script>

{#if !data?.product}
  <div class="h-80 grid place-items-center">
    <h2 class="font-medium text-gray-700">No product found</h2>
  </div>
{:else}
  <div class="mx-4">
    <Breadcrumbs content_breadcrumbs={breadcrumbs} />

    <ProductOverview product={data.product} />

    <ProductSpecifications {specifications} product_title={data.product.title} />
  </div>
{/if}

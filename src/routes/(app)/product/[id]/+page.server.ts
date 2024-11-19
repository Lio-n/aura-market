import { ProductService } from '$lib/services/productService';
import type { ProductEntity } from '$lib/stores/product.store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { data, status, error } = await ProductService.getById(params.id);

  let product: ProductEntity | null = null;

  if (data) {
    product = {
      ...data,
      specifications: {
        brand: 'Lorem ipsum',
        model: 'Lorem ipsum',
      },
    };
  }

  return { product };
};

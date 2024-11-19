import { ProductService } from '$lib/services/productService';
import type { ProductEntity } from '$lib/stores/product.store';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
  const { data, status, error } = await ProductService.getByCategory(params.slug);

  const products: Array<ProductEntity> | [] = data?.length ? data : [];

  return { products };
};

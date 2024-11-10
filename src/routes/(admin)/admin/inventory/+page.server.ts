// import { error } from '@sveltejs/kit';
import type { ProductInventory } from '$lib/stores/product.store';
import type { PageServerLoad } from './$types';
// import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';

export const load: PageServerLoad = async ({ params }) => {
  // const res = await fetch(
  //   PUBLIC_PLATZI_FAKE_STORE_API_V1 + `products/?offset=0&limit=20`
  // );
  // const products = await res.json();

  const mockProduct: ProductInventory = {
    id: 1,
    title: 'Apple MacBook Pro 17',
    images: ['/products/clothes.jpeg'],
    category: {
      id: 1,
      name: 'Laptop',
      image: '/products/clothes.jpeg',
    },
    SKU: '	DEF-456-BLU',
    stock: 120,
    price: 2.5,
  };
  const products = Array.from({ length: 15 }, (_, i) => ({
    ...mockProduct,
    title: 'Apple MacBook Pro 17 - ' + i,
    id: i,
  }));

  return {
    products,
  };
};

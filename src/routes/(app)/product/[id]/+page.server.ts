import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ProductEntity } from '$lib/stores/product.store';

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  if (!id) error(404);

  const product: ProductEntity = {
    id: 2,
    title: 'Classic Red Pullover Hoodie',
    price: 10,
    stock: 15,
    description:
      'Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.',
    images: [
      'https://i.imgur.com/1twoaDy.jpeg',
      'https://i.imgur.com/FDwQgLy.jpeg',
      'https://i.imgur.com/kg1ZhhH.jpeg',
    ],
    category: {
      id: 1,
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
    },
    specifications: {
      brand: 'Mountain',
      model: 'DASD-ADE-DEAD',
    },
  };

  return {
    product,
  };
};

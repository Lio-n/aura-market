import { randomNumbers, randomSKU } from '$lib/helper/randomSKU';
import { initialCategory, type CATEGORY, type ProductInventory } from '$lib/stores/product.store';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = await request.formData();

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as Omit<
      ProductInventory,
      'category' | 'image'
    > & {
      category: CATEGORY;
      specification_brand: string;
      specification_model: string;
      uploadedImages: string;
    };

    const category = initialCategory[formDataObject.category];

    const parsedProduct: ProductInventory = {
      id: randomNumbers(),
      title: formDataObject.title,
      images: JSON.parse(formDataObject.uploadedImages),
      description: formDataObject.description,
      category,
      SKU: randomSKU(),
      stock: formDataObject.stock,
      price: formDataObject.price,
      specifications: { brand: formDataObject.specification_brand, model: formDataObject.specification_model },
    };

    return { success: true, product: parsedProduct };
  },
  updateProduct: async ({ request }) => {
    const formData = await request.formData();

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as Omit<
      ProductInventory,
      'category' | 'image' | 'id' | 'SKU'
    > & {
      category: CATEGORY;
      specification_brand: string;
      specification_model: string;
      uploadedImages: string;
    };

    const category = initialCategory[formDataObject.category];

    const parsedProduct: Omit<ProductInventory, 'id' | 'SKU'> = {
      title: formDataObject.title,
      images: JSON.parse(formDataObject.uploadedImages),
      description: formDataObject.description,
      category,
      stock: formDataObject.stock,
      price: formDataObject.price,
      specifications: { brand: formDataObject.specification_brand, model: formDataObject.specification_model },
    };

    return { success: true, product: parsedProduct };
  },
};

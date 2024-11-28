import { randomNumbers, randomSKU } from '$lib/helper/randomSKU';
import {
  CreateProductFormSchema,
  CreateProductSchema,
  UpdateProductFormSchema,
  type CreateProductFormType,
  type UpdateProductFormType,
  type UpdateProductType,
} from '$lib/schemas/product.schema';
import { initialCategory, type CATEGORY, type ProductInventory } from '$lib/stores/product.store';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = await request.formData();

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as Omit<
      CreateProductFormType,
      'image' | 'price' | 'stock'
    > & {
      uploadedImages: string;
      price: string;
      stock: string;
    };

    const result = CreateProductFormSchema.safeParse({
      ...formDataObject,
      price: parseInt(formDataObject.price),
      stock: parseInt(formDataObject.stock),
      images: JSON.parse(formDataObject.uploadedImages || '[]'),
    });

    if (result.error) {
      const parsedErrors = Object.fromEntries(
        // @ts-ignore
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );

      const response = { success: result.success, error: parsedErrors };

      return response;
    }

    const category = initialCategory[result.data.category as CATEGORY];

    const parsedProduct: ProductInventory = {
      id: randomNumbers(),
      title: result.data.title,
      images: result.data.images,
      description: result.data.description,
      category,
      SKU: randomSKU(),
      stock: result.data.stock,
      price: result.data.price,
      specifications: { brand: result.data.brand, model: result.data.model },
    };

    const response = CreateProductSchema.safeParse(parsedProduct);

    return { success: result.success, data: response.data };
  },
  updateProduct: async ({ request }) => {
    const formData = await request.formData();

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as Omit<
      UpdateProductFormType,
      'image' | 'price' | 'stock'
    > & {
      uploadedImages: string;
      price: string;
      stock: string;
    };

    const result = UpdateProductFormSchema.safeParse({
      ...formDataObject,
      price: parseInt(formDataObject.price),
      stock: parseInt(formDataObject.stock),
      images: JSON.parse(formDataObject.uploadedImages || '[]'),
    });

    if (result.error) {
      const parsedErrors = Object.fromEntries(
        // @ts-ignore
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );

      const response = { success: result.success, error: parsedErrors };

      return response;
    }

    const category = initialCategory[result.data.category as CATEGORY];

    const parsedProduct: UpdateProductType = {
      title: result.data.title,
      images: result.data.images,
      description: result.data.description,
      category,
      stock: result.data.stock,
      price: result.data.price,
      specifications: { brand: result.data.brand, model: result.data.model },
    };

    return { success: result.success, data: parsedProduct };
  },
};

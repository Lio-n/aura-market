import { CATEGORY } from '$lib/stores/product.store';
import { z } from 'zod';

const Category = z.object({
  id: z.number().positive(),
  name: z.string(),
  image: z.string(),
});

export const CreateProductSchema = z.object({
  id: z.number().positive(),
  SKU: z.string(),
  title: z.string().min(5, 'Title is required, min 5 - max 100 characters.').max(100),
  category: Category,
  images: z.string().array().min(1, 'Images is required'),
  description: z.string().min(10, 'Description is required, min 10 - max 150 characters.').max(100),
  stock: z.number().positive().min(1, 'Stock is required, min 1 - max 500 amount.').max(500),
  price: z.number().positive().min(1, 'Price is required, min 1.'),
  specifications: z.object({
    brand: z.string(),
    model: z.string(),
  }),
});
export type CreateProductType = z.infer<typeof CreateProductSchema>;

export const CreateProductFormSchema = CreateProductSchema.omit({
  id: true,
  SKU: true,
  specifications: true,
  category: true,
}).extend({
  brand: z.string(),
  model: z.string(),
  category: z.enum(Object.values(CATEGORY) as any),
});

export type CreateProductFormType = z.infer<typeof CreateProductFormSchema>;

export const UpdateProductSchema = CreateProductSchema.omit({ id: true, SKU: true });

export const UpdateProductFormSchema = CreateProductFormSchema;
export type UpdateProductFormType = z.infer<typeof UpdateProductFormSchema>;
export type UpdateProductType = z.infer<typeof UpdateProductSchema>;

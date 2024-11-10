import { writable } from 'svelte/store';

type ProductCategory = {
  id: number;
  name: string;
  image: string;
};

export interface ProductEntity {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
}

export interface ProductInventory extends Pick<ProductEntity, 'id' | 'title' | 'category' | 'images'> {
  SKU: string;
  stock: number;
  price: number;
}

export const productsStore = writable<ProductEntity[]>([]);

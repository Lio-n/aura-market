import { derived, readable, writable, type Readable } from 'svelte/store';
import { storage } from './localStorage';

type ProductCategory = {
  id: number;
  name: string;
  image: string;
};

export interface ProductEntity {
  id: number;
  title: string;
  price: number;
  stock: number;
  description: string;
  category: ProductCategory;
  images: string[];
  specifications: ProductSpecifications;
}
export interface ProductSpecifications {
  brand: string;
  model: string;
}
export interface ProductInventory
  extends Pick<ProductEntity, 'id' | 'title' | 'category' | 'images' | 'description' | 'specifications'> {
  SKU: string;
  stock: number;
  price: number;
}

const storedProductsIventory = storage.getItem<string | null>('products_inventory_store');
const initialProductsIventory: ProductInventory[] | [] = storedProductsIventory
  ? JSON.parse(storedProductsIventory)
  : [];

export const productsInventoryStore = writable<ProductInventory[] | []>(initialProductsIventory);
export const productsStore: Readable<ProductEntity[]> = derived(
  productsInventoryStore,
  ($productsInventoryStore: ProductInventory[]) => $productsInventoryStore.map(({ SKU, ...rest }) => rest)
);

productsInventoryStore.subscribe((value) => {
  if (value) {
    storage.setItem('products_inventory_store', JSON.stringify(value));
  } else {
    storage.removeItem('products_inventory_store');
  }
});

export enum CATEGORY {
  'Clothes' = 'Clothes',
  'Electronics' = 'Electronics',
  'Miscellaneous' = 'Miscellaneous',
  'Shoes' = 'Shoes',
}
export const initialCategory: {
  [key in CATEGORY]: ProductCategory;
} = {
  Clothes: {
    id: 1,
    name: 'Clothes',
    image: '/products/clothes.jpeg',
  },
  Electronics: {
    id: 2,
    name: 'Electronics',
    image: '/products/electronics.jpeg',
  },
  Miscellaneous: {
    id: 5,
    name: 'Miscellaneous',
    image: '/products/miscellaneous.jpeg',
  },
  Shoes: {
    id: 4,
    name: 'Shoes',
    image: '/products/shoes.jpeg',
  },
};

export const CodeByCategory: {
  [key: string]: number;
} = {
  [initialCategory.Clothes.name]: initialCategory.Clothes.id,
  [initialCategory.Electronics.name]: initialCategory.Electronics.id,
  [initialCategory.Miscellaneous.name]: initialCategory.Miscellaneous.id,
  [initialCategory.Shoes.name]: initialCategory.Shoes.id,
};

export const categoryStore = readable<{
  [key in CATEGORY]: ProductCategory;
}>(initialCategory);

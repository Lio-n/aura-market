import { writable } from 'svelte/store';
import type { Role } from './constants';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

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

export const userStore = writable<UserEntity | null>();
export const productsStore = writable<ProductEntity[]>([]);
export const cartStore = writable<number[]>([]);

import { writable } from 'svelte/store';
import type { ProductEntity } from './product.store';
import { CartService } from '$lib/services/cartService';
import { storage } from './localStorage';
import { PUBLIC_STORAGE_KEY_CART } from '$env/static/public';

export interface CartItem {
  item: ProductEntity;
  quantity: number;
}

export interface CartStore {
  items: Record<number, CartItem>;
  totalQuantity: number;
  total_price: number;
}

const createCart = () => {
  const storedCart = storage.getItem<string | null>(PUBLIC_STORAGE_KEY_CART);
  const initialCart: CartStore = storedCart
    ? JSON.parse(storedCart)
    : {
        items: {},
        totalQuantity: 0,
        total_price: 0,
      };

  const store = writable<CartStore>(initialCart);

  const cartService = new CartService(store);

  cartService.subscribe((cart) => {
    storage.setItem(PUBLIC_STORAGE_KEY_CART, JSON.stringify(cart));
  });

  return cartService;
};

const cartStore = createCart();
export { cartStore };

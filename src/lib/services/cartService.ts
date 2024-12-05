import { PUBLIC_STORAGE_KEY_CART } from '$env/static/public';
import { type CartItem, type CartStore } from '$lib/stores/cart.store';
import { storage, type LocalStorage } from '$lib/stores/localStorage';
import type { ProductEntity } from '$lib/stores/product.store';
import { type Writable } from 'svelte/store';

export class CartService {
  private store: Writable<CartStore>;
  private localStorage: LocalStorage = storage;
  private STORAGE_KEY: string = PUBLIC_STORAGE_KEY_CART;

  constructor(store: Writable<CartStore>) {
    this.store = store;
  }

  addItem(item: ProductEntity, quantity: number = 1): void {
    this.store.update((cart) => {
      cart.items = [...cart.items, { item, quantity }];
      cart.total_quantity++;
      cart.total_price += parseFloat(item.price * quantity + '');

      return cart;
    });
  }

  removeItem(id: number) {
    this.store.update((cart) => {
      const toRemove = cart.items.find((i) => i.item.id === id) as CartItem;

      cart.total_quantity--;
      cart.total_price -= toRemove.item.price * toRemove.quantity;

      cart.items = [...cart.items.filter((i) => i.item.id !== toRemove.item.id)];
      return cart;
    });
  }

  updateQuantity(id: number, quantity: number) {
    this.store.update((cart) => {
      const currentItem = cart.items.find((i) => i.item.id === id) as CartItem;

      if (currentItem) {
        const quantityDifference = quantity - currentItem.quantity;
        cart.total_price += currentItem.item.price * quantityDifference;

        currentItem.quantity = quantity;
      }

      return cart;
    });
  }

  reset() {
    this.store.set({
      items: [],
      total_quantity: 0,
      total_price: 0,
    });

    this.localStorage.removeItem(this.STORAGE_KEY);
  }

  subscribe(callback: (cart: CartStore) => void) {
    return this.store.subscribe(callback);
  }
}

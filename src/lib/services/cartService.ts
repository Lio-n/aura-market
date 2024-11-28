import { type CartStore } from '$lib/stores/cart.store';
import { storage, type LocalStorage } from '$lib/stores/localStorage';
import type { ProductEntity } from '$lib/stores/product.store';
import { type Writable } from 'svelte/store';

export class CartService {
  private store: Writable<CartStore>;
  private localStorage: LocalStorage = storage;
  private STORAGE_KEY: string = 'cart_store';

  constructor(store: Writable<CartStore>) {
    this.store = store;
  }

  addItem(item: ProductEntity): void {
    this.store.update((cart) => {
      cart.items[item.id] = { item, quantity: 1 };
      cart.totalQuantity++;
      cart.total_price += parseFloat(item.price + '');

      return cart;
    });
  }

  removeItem(id: number) {
    this.store.update((cart) => {
      cart.totalQuantity -= cart.items[id].quantity;
      cart.total_price -= cart.items[id].item.price * cart.items[id].quantity;

      delete cart.items[id];
      return cart;
    });
  }

  updateQuantity(id: number, quantity: number) {
    this.store.update((cart) => {
      const currentItem = cart.items[id];

      if (currentItem) {
        const quantityDifference = quantity - currentItem.quantity;
        cart.totalQuantity += quantityDifference;
        cart.total_price += currentItem.item.price * quantityDifference;

        currentItem.quantity = quantity;
      }

      return cart;
    });
  }

  reset() {
    this.store.set({
      items: {},
      totalQuantity: 0,
      total_price: 0,
    });

    this.localStorage.removeItem(this.STORAGE_KEY);
  }

  subscribe(callback: (cart: CartStore) => void) {
    return this.store.subscribe(callback);
  }
}

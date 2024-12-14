import { writable } from 'svelte/store';
import type { CartItem } from './cart.store';
import { storage } from './localStorage';

export interface OrderDetails {
  id: string;
  items: Record<number, CartItem>;
  grand_total: number;
  payment: {
    transactionId: string;
    status: 'completed' | 'failed' | 'pending' | null;
  };
  createdAt: Date | null;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | null;
}

const createOrder = () => {
  const storedOrders = storage.getItem<string | null>('order_store');
  const initial: Array<OrderDetails> = storedOrders ? JSON.parse(storedOrders) : [];

  const store = writable<Array<OrderDetails> | []>(initial);

  store.subscribe((order_store) => {
    storage.setItem('order_store', JSON.stringify(order_store));
  });

  return store;
};

export const orderStore = createOrder();

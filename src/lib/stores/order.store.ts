import { writable } from 'svelte/store';
import type { CartItem } from './cart.store';

export interface OrderDetails {
  id: string;
  items: Record<number, CartItem>;
  totalAmount: number;
  payment: {
    transactionId: string;
    status: 'completed' | 'failed' | 'pending' | null;
  };
  createdAt: Date | null;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | null;
}

export const orderStore = writable<Array<OrderDetails> | []>([]);

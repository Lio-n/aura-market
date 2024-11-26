import { writable } from 'svelte/store';
import type { CheckoutDetails } from './checkout.store';

export interface PaymentDetails {
  credit_card: {
    holder_name: string;
    last_4_digits: string;
    type: 'Visa';
  };
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  amount: number; // total_items_price + shipping_price.
}

export interface PaymentStore {
  paymentDetails: PaymentDetails;
  checkoutDetails: Pick<CheckoutDetails, 'customer' | 'shipping' | 'total_price'>;
}

export const paymentStore = writable<Array<PaymentStore> | []>([]);

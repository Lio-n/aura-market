import { writable } from 'svelte/store';
import type { CheckoutDetails } from './checkout.store';
import { storage } from './localStorage';

export interface PaymentDetails {
  credit_card: {
    holder_name: string;
    last_4_digits: string;
    expiration_date: string;
    card_cvv: string;
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

const createPayment = () => {
  const storedPayment = storage.getItem<string | null>('payment_store');
  const initial: Array<PaymentStore> = storedPayment ? JSON.parse(storedPayment) : [];

  const store = writable<Array<PaymentStore> | []>(initial);

  store.subscribe((payment_store) => {
    storage.setItem('payment_store', JSON.stringify(payment_store));
  });

  return store;
};

export const paymentStore = createPayment();

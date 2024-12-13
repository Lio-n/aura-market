import { writable } from 'svelte/store';
import type { CreateShippingAddressFormType } from '$lib/schemas/shippingAddress.schema';
import { storage } from './localStorage';

export type Countries = {
  countryCode: string;
  country: string;
  flag: string;
};

export interface ShippingAddressEntity extends Omit<CreateShippingAddressFormType, 'confirm_email' | 'country'> {
  country: Countries;
  id: string;
}

const createShippingAddress = () => {
  const storedAddress = storage.getItem<string | null>('shipping_store');
  const initial: Array<ShippingAddressEntity> = storedAddress ? JSON.parse(storedAddress) : [];

  const store = writable<Array<ShippingAddressEntity> | null>(initial);

  store.subscribe((shipping_store) => {
    storage.setItem('shipping_store', JSON.stringify(shipping_store));
  });

  return store;
};

export const shippingAddressStore = createShippingAddress();

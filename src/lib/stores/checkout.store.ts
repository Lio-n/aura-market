import { writable } from 'svelte/store';
import type { CartItem } from './cart.store';
import { SHIPPING_METHOD, SHIPPING_TYPES, type SHIPPING_ITEM } from '../../constants';
import type { Countries } from '../../routes/(protected)/checkout/+page.server';
export interface ShippingType extends SHIPPING_ITEM {}

export interface ShippingAddress {
  country: Countries;
  street_name: string;
  city: string;
  region: string;
  postal_code: string;
}

export interface CustomerDetails {
  email: string;
  fullname: string;
  phone_number: string;
}

export interface CheckoutDetails {
  items: Record<number, CartItem>;
  total_price: number;
  shipping: {
    info: ShippingType;
    address: ShippingAddress;
  };
  customer: CustomerDetails;
}

const createCheckout = () => {
  const initialCheckout: CheckoutDetails = {
    items: {},
    total_price: 0,
    shipping: {
      info: {
        method: SHIPPING_METHOD[SHIPPING_TYPES.FREE].method,
        label: SHIPPING_METHOD[SHIPPING_TYPES.FREE].label,
        price: SHIPPING_METHOD[SHIPPING_TYPES.FREE].price,
        lead_time: SHIPPING_METHOD[SHIPPING_TYPES.FREE].lead_time,
      },
      address: {
        country: {
          countryCode: '',
          country: '',
          flag: '',
        },
        street_name: '',
        city: '',
        region: '',
        postal_code: '',
      },
    },
    customer: {
      email: '',
      fullname: '',
      phone_number: '',
    },
  };

  const { subscribe, set, update } = writable<CheckoutDetails>({ ...initialCheckout });

  return {
    subscribe,
    set,
    update,
    reset: () => set({ ...initialCheckout }),
  };
};

export const checkoutStore = createCheckout();

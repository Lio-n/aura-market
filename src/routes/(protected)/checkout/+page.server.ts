import type { Actions, PageServerLoad } from './$types';
import countriesJson from '$lib/data/json/countries.json';
import { type CheckoutDetails } from '$lib/stores/checkout.store';
import { SHIPPING_METHOD, type SHIPPING_TYPES } from '../../../constants';

export type Countries = {
  countryCode: string;
  country: string;
  flag: string;
};

export const load: PageServerLoad = async () => {
  let countries: Array<{ value: string; name: string }> | null = null;

  countries = countriesJson.map((i: Countries) => ({
    value: i.countryCode,
    name: i.flag + ' ' + i.country,
  }));

  return { countries };
};

export const actions: Actions = {
  createCheckout: async ({ request }) => {
    const formData = await request.formData();

    interface ProcessedFormData {
      country: String;
      fullname: string;
      email: string;
      confirm_email: string;
      phone_numnber: string;
      street_name: string;
      region: string;
      city: string;
      postal_code: string;
      shipping_method: SHIPPING_TYPES;
    }

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as ProcessedFormData;

    const parsedCheckout: Pick<CheckoutDetails, 'customer' | 'shipping'> = {
      shipping: {
        info: SHIPPING_METHOD[formDataObject.shipping_method],
        address: {
          country: countriesJson.find((i) => i.countryCode === formDataObject.country) as Countries,
          street_name: formDataObject.street_name,
          city: formDataObject.city,
          region: formDataObject.region,
          postal_code: formDataObject.postal_code,
        },
      },
      customer: {
        email: formDataObject.email,
        fullname: formDataObject.fullname,
        phone_number: formDataObject.phone_numnber,
      },
    };

    console.log('load : ', parsedCheckout);

    return { success: true, checkout: parsedCheckout };
  },
};

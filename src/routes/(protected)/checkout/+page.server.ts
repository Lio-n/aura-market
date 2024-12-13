import type { Actions, PageServerLoad } from './$types';
import countriesJson from '$lib/data/json/countries.json';
import { SHIPPING_METHOD } from '../../../constants';
import {
  CreateCheckoutFormSchema,
  CreateCheckoutSchema,
  type CreateCheckoutFormType,
  type CreateCheckoutType,
} from '$lib/schemas/checkout.schema';
import { delay } from '$lib/helper/delay';
import type { Countries } from '$lib/stores/shippingAddress.store';

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

    await delay(2000);

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as CreateCheckoutFormType;

    const result = CreateCheckoutFormSchema.safeParse(formDataObject);

    if (result.error) {
      const parsedErrors = Object.fromEntries(
        // @ts-ignore
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );

      const response = { success: result.success, error: parsedErrors };

      return response;
    }

    const parsedCheckout: CreateCheckoutType = {
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
        phone_number: formDataObject.phone_number,
      },
    };

    const response = CreateCheckoutSchema.safeParse(parsedCheckout);

    return { success: result.success, data: response.data };
  },
};

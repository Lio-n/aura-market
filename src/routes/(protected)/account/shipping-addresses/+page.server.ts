import type { Actions } from './$types';
import { delay } from '$lib/helper/delay';
import {
  CreateShippingAddressFormSchema,
  type CreateShippingAddressFormType,
} from '$lib/schemas/shippingAddress.schema';
import countriesJson from '$lib/data/json/countries.json';
import type { Countries } from '$lib/stores/shippingAddress.store';
import { randomNumbers } from '$lib/helper/randomSKU';

export const actions: Actions = {
  createShippingAddress: async ({ request }) => {
    const formData = await request.formData();

    await delay(2000);

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as CreateShippingAddressFormType;

    const result = CreateShippingAddressFormSchema.safeParse(formDataObject);

    if (result.error) {
      const parsedErrors = Object.fromEntries(
        // @ts-ignore
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );

      const response = { success: result.success, error: parsedErrors };

      return response;
    }

    const { confirm_email, ...res } = result.data;

    const country = countriesJson.find((i) => i.countryCode === result.data.country) as Countries;

    return { success: result.success, data: { ...res, country, id: randomNumbers() } };
  },
  updateShippingAddress: async ({ request }) => {
    const formData = await request.formData();

    await delay(2000);

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as CreateShippingAddressFormType;

    const result = CreateShippingAddressFormSchema.safeParse(formDataObject);

    if (result.error) {
      const parsedErrors = Object.fromEntries(
        // @ts-ignore
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );

      const response = { success: result.success, error: parsedErrors };

      return response;
    }

    const { confirm_email, ...res } = result.data;

    const country = countriesJson.find((i) => i.countryCode === result.data.country) as Countries;

    return { success: result.success, data: { ...res, country } };
  },
};

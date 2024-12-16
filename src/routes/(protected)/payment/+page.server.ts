import type { PaymentStore } from '$lib/stores/payment.store';
import countriesJson from '$lib/data/json/countries.json';
import { CreatePaymentFormSchema, type CreatePaymentFormType } from '$lib/schemas/payment.schema';
import { delay } from '$lib/helper/delay';
import type { Countries } from '$lib/stores/shippingAddress.store';
import { SHIPPING_METHOD } from '../../../constants';

export const actions = {
  createPayment: async ({ request }) => {
    const formData = await request.formData();

    await delay(2000);

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as CreatePaymentFormType;

    const result = CreatePaymentFormSchema.safeParse({
      ...formDataObject,
      total_price: parseFloat(formDataObject.total_price + ''),
    });

    if (result.error) {
      const parsedErrors = Object.fromEntries(
        // @ts-ignore
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );

      const response = { success: result.success, error: parsedErrors };

      return response;
    }

    const parsedPayment: PaymentStore = {
      paymentDetails: {
        credit_card: {
          holder_name: result.data.card_name,
          last_4_digits: result.data.card_number.slice(-4),
          type: 'Visa',
          expiration_date: result.data.expiration_date,
          card_cvv: result.data.card_cvv,
        },
        status: 'completed',
        transactionId: crypto.randomUUID(),
        amount: result.data.total_price + SHIPPING_METHOD[result.data.shipping_method].price,
      },
      checkoutDetails: {
        total_price: result.data.total_price,
        customer: {
          email: result.data.customer_email,
          fullname: result.data.customer_fullname,
          phone_number: result.data.phone_number,
        },
        shipping: {
          info: SHIPPING_METHOD[result.data.shipping_method],
          address: {
            country: countriesJson.find((i) => i.countryCode === result.data.country) as Countries,
            street_name: result.data.street_name,
            city: result.data.city,
            region: result.data.region,
            postal_code: result.data.postal_code,
          },
        },
      },
    };

    return { success: result.success, data: parsedPayment };
  },
};

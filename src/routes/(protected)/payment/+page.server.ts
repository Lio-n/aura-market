import type { PaymentStore } from '$lib/stores/payment.store';
import type { Countries } from '../checkout/+page.server';
import countriesJson from '$lib/data/json/countries.json';

export const actions = {
  createPayment: async ({ request }) => {
    const formData = await request.formData();

    interface ProcessedFormData {
      country: string;
      phone_numnber: string;
      street_name: string;
      region: string;
      city: string;
      postal_code: string;
      card_number: string;
      card_name: string;
      expiration_date: string;
      card_cvv: string;
      total_price: number;
      customer_email: string;
      customer_fullname: string;
      shipping_method: string;
      shipping_label: string;
      shipping_price: number;
      shipping_lead_time: string;
    }

    const formDataObject = Object.fromEntries(formData.entries()) as unknown as ProcessedFormData;

    const parsedPayment: PaymentStore = {
      paymentDetails: {
        credit_card: {
          holder_name: formDataObject.card_name,
          last_4_digits: formDataObject.card_number.slice(-4),
          type: 'Visa',
        },
        status: 'pending',
        transactionId: crypto.randomUUID(),
        amount: formDataObject.total_price + formDataObject.shipping_price,
      },
      checkoutDetails: {
        total_price: formDataObject.total_price,
        customer: {
          email: formDataObject.customer_email,
          fullname: formDataObject.customer_fullname,
          phone_number: formDataObject.phone_numnber,
        },
        shipping: {
          info: {
            method: formDataObject.shipping_method,
            label: formDataObject.shipping_label,
            price: formDataObject.shipping_price,
            lead_time: formDataObject.shipping_lead_time,
          },
          address: {
            country: countriesJson.find((i) => i.countryCode === formDataObject.country) as Countries,
            street_name: formDataObject.street_name,
            city: formDataObject.city,
            region: formDataObject.region,
            postal_code: formDataObject.postal_code,
          },
        },
      },
    };

    return { success: true, payment: parsedPayment };
  },
};

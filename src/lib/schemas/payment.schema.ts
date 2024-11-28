import { z } from 'zod';
import { CARD_CVV_REGEX, CARD_NUMBER_REGEX, EXPIRATION_DATE_REGEX, PHONE_NUMBER_REGEX } from '../../constants';
import { CreateCheckoutFormSchema } from './checkout.schema';

export const CreatePaymentFormSchema = z
  .object({
    country: z.string(),
    phone_number: z.string().regex(new RegExp(PHONE_NUMBER_REGEX), { message: 'Invalid Phone number.' }),
    street_name: z.string().min(5, 'Street name is required, min 5 - max 100 characters.').max(100),
    region: z.string().min(5, 'Region is required, min 5 - max 50 characters.').max(50),
    city: z.string().min(5, 'City is required, min 5 - max 50 characters.').max(50),
    postal_code: z.string().min(5, 'Postal code is required, min 5 - max 10 characters.').max(10),

    shipping_method: z.enum(['FREE', 'REGULAR', 'EXPRESS']),
    shipping_label: z.string(),
    shipping_lead_time: z.string(),
    shipping_price: z.number(),
    total_price: z.number(),

    card_number: z.string().regex(CARD_NUMBER_REGEX, { message: 'Card number must be 16 digits.' }),
    card_name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .max(50, { message: 'Name cannot exceed 50 characters.' }),
    expiration_date: z.string().regex(EXPIRATION_DATE_REGEX, { message: 'Expiration date must be in MM/YY format.' }),
    card_cvv: z.string().regex(CARD_CVV_REGEX, { message: 'CVV must be 3 or 4 digits.' }),

    customer_email: z.string().email({ message: 'Invalid email address' }),
    customer_fullname: z.string(),
  })
  .refine(
    (data) => {
      if (data.expiration_date) {
        const [month, year] = data.expiration_date.split('/').map(Number);
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;
        return year > currentYear || (year === currentYear && month >= currentMonth);
      }
    },
    {
      message: 'Expiration date must be in the future.',
      path: ['expiration_date'],
    }
  );

export type CreatePaymentFormType = z.infer<typeof CreatePaymentFormSchema>;

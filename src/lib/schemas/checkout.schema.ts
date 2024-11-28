import { z } from 'zod';
import { PHONE_NUMBER_REGEX } from '../../constants';

export const CreateCheckoutFormSchema = z
  .object({
    country: z.string(),
    email: z.string().email({ message: 'Invalid email address' }),
    confirm_email: z.string().email({ message: 'Invalid email address' }),
    fullname: z.string().min(5, 'Fullname is required, min 5 - max 50 characters.').max(50),
    phone_number: z.string().regex(new RegExp(PHONE_NUMBER_REGEX), { message: 'Invalid Phone number.' }),
    street_name: z.string().min(5, 'Street name is required, min 5 - max 100 characters.').max(100),
    region: z.string().min(5, 'Region is required, min 5 - max 50 characters.').max(50),
    city: z.string().min(5, 'City is required, min 5 - max 50 characters.').max(50),
    postal_code: z.string().min(5, 'Postal code is required, min 5 - max 10 characters.').max(10),
    shipping_method: z.enum(['FREE', 'REGULAR', 'EXPRESS']),
  })
  .refine((data) => data.email === data.confirm_email, {
    message: 'Email do not match.',
    path: ['confirm_email'],
  });

export type CreateCheckoutFormType = z.infer<typeof CreateCheckoutFormSchema>;

const CountrySchema = z.object({
  countryCode: z.string(),
  country: z.string(),
  flag: z.string(),
});

export const CreateCheckoutSchema = z.object({
  shipping: z.object({
    info: z.object({
      method: z.string(),
      label: z.string(),
      lead_time: z.string(),
      price: z.number(),
    }),
    address: z.object({
      country: CountrySchema,
      street_name: z.string(),
      city: z.string(),
      region: z.string(),
      postal_code: z.string(),
    }),
  }),
  customer: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    fullname: z.string(),
    phone_number: z.string().regex(new RegExp(PHONE_NUMBER_REGEX), { message: 'Invalid Phone number.' }),
  }),
});
export type CreateCheckoutType = z.infer<typeof CreateCheckoutSchema>;

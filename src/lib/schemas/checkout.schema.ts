import { z } from 'zod';
import { PHONE_NUMBER_REGEX } from '../../constants';
import { CreateShippingAddressFormSchema } from './shippingAddress.schema';

export const CreateCheckoutFormSchema = CreateShippingAddressFormSchema.and(
  z.object({
    shipping_method: z.enum(['FREE', 'REGULAR', 'EXPRESS']),
  })
);

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
      lead_time: z.object({ min: z.number(), max: z.number() }),
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

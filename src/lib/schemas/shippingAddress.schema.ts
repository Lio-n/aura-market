import { z } from 'zod';
import { PHONE_NUMBER_REGEX } from '../../constants';

export const CreateShippingAddressFormSchema = z
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
  })
  .refine((data) => data.email === data.confirm_email, {
    message: 'Email do not match.',
    path: ['confirm_email'],
  });

export type CreateShippingAddressFormType = z.infer<typeof CreateShippingAddressFormSchema>;

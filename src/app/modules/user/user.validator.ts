import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const addressValidationSchema = z.object({
  city: z.string(),
  country: z.string(),
  street: z.string(),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string({ required_error: 'Username is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, {
      message: 'Password length min 8',
    })
    .max(20, { message: 'Password lenght max length is 20' }),
  fullName: fullNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string().email('Not a valid email.'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

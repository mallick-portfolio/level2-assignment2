import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: 'First name at list 5 character' })
    .max(20, { message: 'First name at max 20 character' }),
  lastName: z.string(),
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
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

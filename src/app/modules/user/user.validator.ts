import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
});

const addressValidationSchema = z.object({
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  }),
  street: z.string({
    required_error: 'Streat is required',
    invalid_type_error: 'Streat must be a string',
  }),
});

export const orderValidationSchema = z.object({
  productName: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
});

export const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'UserId is required',
    invalid_type_error: 'UserId must be a number',
  }),
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, {
      message: 'Password length min 8',
    })
    .max(20, { message: 'Password lenght max length is 20' }),
  fullName: fullNameValidationSchema,
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a number',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string',
    })
    .email('Not a valid email.'),
  isActive: z.boolean().optional().default(true),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

export const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});
export const addressSchema = new Schema<TAddress>({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});
export const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [
    {
      type: String,
      required: true,
    },
  ],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [{ type: orderSchema }],
});

export const User = model<TUser>('User', userSchema);

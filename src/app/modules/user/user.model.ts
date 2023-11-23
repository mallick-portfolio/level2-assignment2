import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
export const fullNameSchema = new Schema<TFullName, UserModel>({
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

const userSchema = new Schema<TUser>(
  {
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);

// before save user
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.salt_password),
  );
  next();
});

// userSchema.post('save', async function (doc, next) {
//   doc.password = '';
//   next();
// });

// static method area

userSchema.statics.isUserExists = async function (id: string) {
  return this.findOne({ userId: id });
};
export const User = model<TUser, UserModel>('User', userSchema);

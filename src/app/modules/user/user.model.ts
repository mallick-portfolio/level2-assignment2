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
export const fullNameSchema = new Schema<TFullName>(
  {
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
  },
  {
    _id: false,
  },
);
export const addressSchema = new Schema<TAddress>(
  {
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
  },
  { _id: false },
);
export const orderSchema = new Schema<TOrder>(
  {
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
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>(
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
      default: true,
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

// find user that has only isActive true
userSchema.pre('find', async function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});
// find one user that has only isActive true
userSchema.pre('findOne', async function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// after update user

// userSchema.post('save', async function (doc, next) {
//   doc.password = '';
//   next();
// });

// static method area

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);

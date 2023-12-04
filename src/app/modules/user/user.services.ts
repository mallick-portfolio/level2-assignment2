import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// get all user form db
const getAllUserFromDB = async () => {
  const result = User.find(
    {},
    {
      _id: 0,
      username: 1,
      fullName: 1,
      email: 1,
      age: 1,
      address: 1,
    },
  );
  return result;
};

// get user by id  form db
const getUserByIDFromDB = async (userId: string) => {
  const result = await User.findOne({ userId }).select('-_id -__v');
  return result;
};

// insert new user into db
const insertUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// update user by id into db
const updateUserByIDIntoDB = async (userId: string, updateData: TUser) => {
  const result = await User.findOneAndUpdate({ userId }, updateData, {
    new: true,
  });
  return result;
};

// Delete user from db
const deleteUserByIDFromDB = async (userId: string) => {
  const result = await User.findOneAndUpdate({ userId }, { isActive: false });
  return result;
};

// update user order by id
const updateUserOrderByUserIDIntoDB = async (
  userId: string,
  updateData: TOrder[],
) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { orders: updateData },
  );
  return result;
};

// calculate total order price for a specific user
const calculateUserTotalOrderPriceFromDB = async (userId: string) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: Number(userId),
      },
    },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$_id',
        total: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } },
      },
    },
    {
      $project: {
        total: 1,
        _id: 0,
      },
    },
  ]);
  return result[0];
};

export const UserServices = {
  insertUserIntoDB,
  getAllUserFromDB,
  getUserByIDFromDB,
  updateUserByIDIntoDB,
  deleteUserByIDFromDB,
  updateUserOrderByUserIDIntoDB,
  calculateUserTotalOrderPriceFromDB,
};

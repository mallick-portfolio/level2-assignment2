import { TUser } from './user.interface';
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
  const result = User.findOne({ userId });
  return result;
};

// insert new user into db
const insertUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// update user by id into db
const updateUserByIDIntoDB = async (userId: string, updateData: TUser) => {
  const result = await User.findOneAndUpdate({ userId }, updateData);
  return result;
};

export const UserServices = {
  insertUserIntoDB,
  getAllUserFromDB,
  getUserByIDFromDB,
  updateUserByIDIntoDB,
};

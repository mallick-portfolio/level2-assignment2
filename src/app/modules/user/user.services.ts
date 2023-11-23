import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUserFromDB = async () => {
  const result = User.find();
  return result;
};

// insert new user
const insertUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  insertUserIntoDB,
  getAllUserFromDB,
};

import { Request, Response } from 'express';
import { UserServices } from './user.services';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    return res.status(200).json({
      success: false,
      message: 'Success',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 404,
        description: error || 'User not found!',
      },
    });
  }
};

// create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await UserServices.insertUserIntoDB(user);
    return res.status(200).json({
      success: false,
      message: 'Success',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 404,
        description: error || 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
};

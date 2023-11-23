import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { userValidationSchema } from './user.validator';
import { ZodError } from 'zod';
import { User } from './user.model';

// get all user data
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

// get all user data
const getUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (await User.isUserExists(userId)) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await UserServices.getUserByIDFromDB(req.params.userId);

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
    const validateData = userValidationSchema.parse(user);
    const result = await UserServices.insertUserIntoDB(validateData);
    return res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    if (error as ZodError) {
      return res.status(500).json({
        success: false,
        error: {
          code: 404,
          description: error || 'Zod error',
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        error: {
          code: 404,
          description: error || 'User not found!',
        },
      });
    }
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserByID,
};

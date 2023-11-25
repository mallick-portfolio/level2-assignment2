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
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        description: error,
      },
    });
  }
};

// get all user data
const getUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.isUserExists(userId);
    if (user) {
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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
    if (await User.isUserExists(user.userId)) {
      return res.status(200).json({
        success: false,
        message: 'User already exist with this id!!!',
      });
    } else {
      const validateData = userValidationSchema.parse(user);
      const result = await UserServices.insertUserIntoDB(validateData);
      return res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    }
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

// update user by id

const updateUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (await User.isUserExists(userId)) {
      const result = await UserServices.updateUserByIDIntoDB(
        userId,
        req.body.user,
      );
      return res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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

// udpate user by id
export const UserController = {
  createUser,
  getAllUsers,
  getUserByID,
  updateUserByID,
};

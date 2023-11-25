import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { orderValidationSchema, userValidationSchema } from './user.validator';
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
      error: error,
    });
  }
};

// get all user data
const getUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.isUserExists(userId);
    if (user) {
      const result = await UserServices.getUserByIDFromDB(userId);
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
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
      error: error,
    });
  }
};

// create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    if (
      (await User.isUserExists(user.userId)) ||
      (await User.isEmailExists(user.email))
    ) {
      return res.status(200).json({
        success: false,
        message: 'User already exist with this email or id!!!',
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
        error: error,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: error,
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
      error: error,
    });
  }
};

// delete user by id
const deleteUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (await User.isUserExists(userId)) {
      await UserServices.deleteUserByIDFromDB(userId);
      return res.status(404).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
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
      error: error,
    });
  }
};

// get all order by user id
const getALlOrderByUserID = async (req: Request, res: Response) => {
  try {
    const user = await User.isUserExists(req.params.userId);
    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: { orders: user.orders },
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
      error: error,
    });
  }
};

// update user order by user id
const updateUserOrderByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.isUserExists(userId);
    const validOrder = orderValidationSchema.parse(req.body.order);
    if (user) {
      const preOrder = user.orders;
      if (preOrder?.length) {
        preOrder.push(validOrder);
        await UserServices.updateUserOrderByUserIDIntoDB(userId, preOrder);
        return res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: null,
        });
      } else {
        const orders = [];
        orders.push(req.body.order);
        await UserServices.updateUserOrderByUserIDIntoDB(userId, orders);
        return res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: null,
        });
      }
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
      error: error,
    });
  }
};

// calculate total order price for a specific user
const calculateUserTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (await User.isUserExists(userId)) {
      const result =
        await UserServices.calculateUserTotalOrderPriceFromDB(userId);
      return res.status(404).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: result?.total,
        },
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
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  updateUserOrderByID,
  getALlOrderByUserID,
  calculateUserTotalOrderPrice,
};

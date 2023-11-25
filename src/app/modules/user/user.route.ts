import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUserByID);
router.put('/:userId', UserController.updateUserByID);
router.delete('/:userId', UserController.deleteUserByID);
router.get('/:userId/orders', UserController.getALlOrderByUserID);
router.put('/:userId/orders', UserController.updateUserOrderByID);
router.get(
  '/:userId/orders/total-price',
  UserController.calculateUserTotalOrderPrice,
);
export const UserRoute = router;

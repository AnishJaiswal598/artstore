import express from 'express';
import {
  listAllOrders,
  orderByID,
  addOrder,
  updateOrder,
  removeOrder,
} from '../controllers/ordersController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/listAll', protect, admin, listAllOrders); // list of orders to admin
router.get('/showByID', orderByID); // listing order by id
router.post('/add', protect, addOrder); // adding orders by user
router.put('/update', protect, updateOrder); // updating orders by user
router.delete('/delete', protect, removeOrder); // deleting orders by user

export default router;

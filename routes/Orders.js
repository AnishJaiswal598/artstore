import express from 'express';
import {
  orderByID,
  addOrder,
  updateOrder,
  removeOrder,
} from '../controllers/ordersController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/showByID', protect, orderByID); // listing order by id
router.post('/add', protect, addOrder); // adding orders by user
router.put('/update/:id', protect, updateOrder); // updating orders by user
router.delete('/delete/:id', protect, removeOrder); // deleting orders by user

export default router;

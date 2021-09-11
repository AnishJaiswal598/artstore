const express = require('express');

const router = express.Router();
const orderController = require('../controllers/ordersController');
const auth = require('../middleware/authMiddleware');

router.get('/listAll', auth.protect, auth.admin, orderController.listAllOrders); // list of orders to admin
router.get('/showByID', orderController.orderByID); // listing order by id
router.post('/add', auth.protect, orderController.addOrder); // adding orders by user
router.put('/update', auth.protect, orderController.updateOrder); // updating orders by user
router.delete('/delete', auth.protect, orderController.removeOrder); // deleting orders by user

module.exports = router;

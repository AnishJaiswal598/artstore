const express = require('express');

const router = express.Router();
const orderController = require('../controllers/ordersController');

router.get('/listAll', orderController.listAllOrders); // listing all order
router.get('/showByID', orderController.orderByID); // listing order by id
router.post('/add', orderController.addOrder); // adding orders
router.put('/updateByID', orderController.updateOrder); // updating
router.delete('/deleteByID', orderController.removeOrder); // deleting order

module.exports = router;

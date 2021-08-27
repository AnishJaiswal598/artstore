const express = require("express")
const router = express.Router();
const orderController = require('../controllers/ordersController')

    router.get('/',orderController.index)
    router.post('/show',orderController.show)
    router.post('/update',orderController.changes)
    router.post('/store',orderController.store)
    router.post('/delete',orderController.remove)
    
module.exports= router;
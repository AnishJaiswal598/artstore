const express = require("express")
const router = express.Router();
const UserController = require('../controllers/usersController')

    router.get('/',UserController.index)
    router.post('/show',UserController.show)
    router.post('/update',UserController.changes)
    router.post('/store',UserController.store)
    router.post('/delete',UserController.remove)
    
module.exports= router;
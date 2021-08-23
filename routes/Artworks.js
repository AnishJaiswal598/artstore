const express = require("express")
const router = express.Router();
// const morgan = require('morgan')
const artworkController = require('../controllers/artworksController')

router.get('/',artworkController.index)
router.post('/show',artworkController.show)
router.post('/update',artworkController.changes)
router.post('/store',artworkController.store)
router.post('/delete',artworkController.remove)
module.exports= router;
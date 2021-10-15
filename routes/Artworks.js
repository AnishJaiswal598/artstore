const express = require('express');

const router = express.Router();
const artworkController = require('../controllers/artworksController');
const auth = require('../middleware/authMiddleware');

router.get('/listAll', artworkController.listAllArtworks); // listing all artworks
router.get('/showByID', artworkController.artworkbyID); // listing artwork by ID
router.post(
  '/add',
  auth.protect,
  auth.admin,
  artworkController.uploadImg,
  artworkController.addArtwork
); // Adding artworks by admin
router.put(
  '/update',
  auth.protect,
  auth.admin,
  artworkController.uploadImg,
  artworkController.updateArtwork
); // Updating artwork by admin
router.delete(
  '/delete',
  auth.protect,
  auth.admin,
  artworkController.removeArtwork
); // deleting artworks by admin

module.exports = router;

const express = require('express');

const router = express.Router();
const artworkController = require('../controllers/artworksController');

router.get('/listAll', artworkController.listAllArtworks); // listing all artworks
router.get('/showByID', artworkController.artworkbyID); // listing artwork by ID
router.post('/add', artworkController.addArtwork); // Adding artworks
router.put('/updateByID', artworkController.updateArtwork); // Updating artwork
router.delete('/deleteByID', artworkController.removeArtwork); // deleting artworks

module.exports = router;

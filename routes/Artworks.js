import express from 'express';
import {
  listAllArtworks,
  artworkbyID,
  addArtwork,
  uploadImg,
  updateArtwork,
  removeArtwork,
} from '../controllers/artworksController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/listAll', listAllArtworks); // listing all artworks
router.get('/showByID', artworkbyID); // listing artwork by ID
router.post('/add', protect, admin, uploadImg, addArtwork); // Adding artworks by admin
router.put('/update', protect, admin, uploadImg, updateArtwork); // Updating artwork by admin
router.delete('/delete', protect, admin, removeArtwork); // deleting artworks by admin

export default router;

import multer from 'multer';
import path from 'path';
import Artwork from '../models/Artworks.js';

// list all the artworks
const listAllArtworks = async (req, res) => {
  try {
    const list = await Artwork.find();
    res.status(200).json({
      success: true,
      message: 'heres the list of all the artworks',
      list,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// call the artwork by id

const artworkbyID = async (req, res) => {
  try {
    const artworkID = req.body.artworkID;
    const showArtwork = await Artwork.findById(artworkID);
    res.status(200).json({
      success: true,
      message: 'The artwork of given id is given below',
      showArtwork,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ADDING AN ARTWORK
const addArtwork = async (req, res) => {
  try {
    const artworkAdd = new Artwork({
      ...req.body,
      artImage: req.file.path,
    });
    const newArtwork = await artworkAdd.save();
    res.status(201).json({
      success: true,
      message: 'new artwork added successfully',
      newArtwork,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// getting artworks image
const a = new Date();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/Artworks');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        a.getDate() +
        '-' +
        (a.getMonth() + 1) +
        '-' +
        a.getFullYear() +
        '-' +
        a.getHours() +
        '.' +
        a.getMinutes() +
        '.' +
        a.getSeconds() +
        ' ' +
        path.extname(file.originalname)
    );
  },
});

const uploadImg = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('artImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (filetypes && mimetype) {
    return cb(null, true);
  } else {
    return cb('Error:Images only');
  }
}

// Updating an artwork by its ID

const updateArtwork = async (req, res) => {
  try {
    const artworkID = req.body.artworkID;
    const updateData = {
      ...req.body,
      image: req.file.path,
    };
    const found = await Artwork.findByIdAndUpdate(
      artworkID,
      { $set: updateData },
      { omitUndefined: 1 }
    );
    if (!found) {
      res.status(404).json({
        success: false,
        message: 'Artwork not found',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Artwork updated sucessfully',
        updateData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Deleting an artwork by its ID

const removeArtwork = async (req, res) => {
  try {
    const artworkID = req.body.artworkID;
    await Artwork.findByIdAndDelete(artworkID);
    res.status(200).json({
      success: true,
      message: 'Artwork removed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  listAllArtworks,
  artworkbyID,
  addArtwork,
  uploadImg,
  updateArtwork,
  removeArtwork,
};

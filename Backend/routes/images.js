const express = require('express');
const multer = require('multer')

const {
    storage,
    getImage,
    uploadImage
} = require('../controllers/imageController');


// using multer for to process the images
const upload = multer({storage: storage})

const router = express.Router();

//GET a single image
router.get('/:id',getImage);

//POST a new image
router.post('/', upload.single('image'), uploadImage);

module.exports = router;

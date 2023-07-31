const ImageModel = require('../models/ImageModel')
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// setting the storage for multer to save the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});




// get a single image
const getImage = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such image'});
    }
    const image = await ImageModel.findById(id);
    if(!image){
        return res.status(404).json({error: 'No such image'});
    }
    console.log(image.img.data)
    const b64 = Buffer.from(image.img.data).toString('base64');
    const mimeType = image.img.contentType

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': b64.length
    });

    res.end(b64, 'base64');
}

// create a new image
const uploadImage = async (req, res) => {
    console.log(req.file);
    const imageBuffer = {
        img: {
            data: fs.readFileSync(path.join(path.dirname(__dirname) + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }
    // add image to db
    try{
        const image = await ImageModel.create(imageBuffer)
        res.status(200).json(image);
    }
    catch (err){
        res.status(400).json({err: err.message})
    }
}

module.exports = {
    storage,
    getImage,
    uploadImage
}
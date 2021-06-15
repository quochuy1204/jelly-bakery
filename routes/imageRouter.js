const router = require('express').Router()
const imageCtrl = require('../controllers/imageCtrl')
const authToken_uploadImage = require('../middleware/auth_uploadImage')
const authAdmin_uploadImage = require('../middleware/authAdmin_uploadImage')
const authToken = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// const fs = require('fs')
// const cloudinary = require('cloudinary')

router.post('/uploadImage', authToken_uploadImage, authAdmin_uploadImage, imageCtrl.uploadImage)
router.post('/deleteImage', authToken, authAdmin, imageCtrl.deleteImage)

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// })

// router.post('/upload', authToken, authAdmin, (req, res) => {
//     try {
//         //check if user upload the file or not 
//         if (!req.files || Object.keys(req.files).length === 0) {
//             removeTmp(file.tempFilePath)
//             return res.status(400).json({ msg: "Please choose your image." });
//         }

//         //if the user already choose the image then get the image from req.files.file
//         const file = req.files.file

//         //check the size of the image, the image have to less than 1Mb
//         if (file.size > 1024 * 1024) {
//             removeTmp(file.tempFilePath)
//             return res.status(400).json({ msg: "Image is too large. The image should less than 1Mb." });
//         }

//         //check the file format
//         if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
//             removeTmp(file.tempFilePath)
//             return res.status(400).json({ msg: "Image format is invalid." });
//         }

//         //use upload method of cloudinary to save the image into the Cloudinary server
//         cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'test' }, (err, result) => {
//             if (err) throw err
//             removeTmp(file.tempFilePath)
//             res.json({ msg: "Uploaded.", public_id: result.public_id, url: result.secure_url })
//         })
//     } catch (err) {
//         return res.status(500).json({ msg: err.message });
//     }
// })

// const removeTmp = (path) => {
//     fs.unlink(path, (err) => {
//         if (err) throw err
//     })
// }

module.exports = router
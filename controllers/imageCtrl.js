const cloudinary = require('cloudinary')
const fs = require('fs')

//config for cloudinary server
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const imageCtrl = {
    uploadImage: async (req, res) => {
        try {

            //check if user upload the file or not 
            if (!req.files || Object.keys(req.files).length === 0) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "Please choose your image." });
            }

            //if the user already choose the image then get the image from req.files.file
            const file = req.files.file

            //check the size of the image, the image have to less than 1Mb
            if (file.size > 2048 * 2048) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "Image is too large. The image should less than 2Mb." });
            }

            //check the file format
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "Image format is invalid." });
            }

            //use upload method of cloudinary to save the image into the Cloudinary server
            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'test' }, (err, result) => {
                if (err) throw err
                removeTmp(file.tempFilePath)
                res.json({ msg: "Uploaded.", public_id: result.public_id, url: result.secure_url })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteImage: (req, res) => {
        try {
            //get public_id from request body
            const { public_id } = req.body

            //check public_id exist or not
            if (!public_id) {
                return res.status(400).json({ msg: "Choose the image." });
            }

            //use destroy method to delete the image
            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) throw err
                res.json({ msg: "Deleted." })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

//the remove temp functional 
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

module.exports = imageCtrl
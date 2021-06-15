const Users = require('../models/userModel')
const removeTmp = require('../middleware/removeTmp')

const authAdmin = async (req, res, next) => {
    try {
        //get user from req.user
        const user = await Users.findOne({
            _id: req.user.id
        })

        //get file image from request files file
        const file = req.files.file

        //check if user exist or not 
        if (!user) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "User does not exist. Please login or sign up." })
        };

        //check the role of the user, if 0 is normal user, if 1 is administrator
        if (user.role === 0) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Administrator resources. Access denied." })
        }

        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = authAdmin
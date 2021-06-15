const Users = require('../models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        //get user from req.user
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (!user) return res.status(400).json({ msg: "User does not exist. Please login or sign up." });

        if (user.role === 0) return res.status(400).json({ msg: "Administrator resources. Access denied." })
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = authAdmin
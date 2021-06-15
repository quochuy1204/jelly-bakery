const jwt = require('jsonwebtoken')
const removeTmp = require('../middleware/removeTmp')

const auth = (req, res, next) => {
    try {
        //get access token from header Authorization
        const token = req.header("Authorization")

        //get file image from request files file
        const file = req.files.file

        //check if token exist or not 
        if (!token) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Authentication failed." })
        };

        //if token exist then check token correct or not 
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Authentication failed." });

            //if the token is correct then assign req.user = user
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = auth
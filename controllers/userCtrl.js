const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payments = require('../models/paymentModel')


const userCtrl = {
    register: async (req, res) => {
        try {
            //get user information from request body
            const { name, email, password } = req.body

            //check into the database either that the email exist or not
            const user = await Users.findOne({ email })

            if (user) return res.status(400).json({ msg: "Email invalid" })

            //check password length
            if (password.length < 8)
                return res.status.json({ msg: "Password must be at least 8 characters" })

            //encrypt password
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                name, email, password: passwordHash
            })

            //save user's account to mongoDB
            await newUser.save()

            //create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            //save refresh token into cookie in client web browser
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ msg: "Sign up successful", accesstoken, refreshtoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: (req, res) => {
        try {
            //get refresh token from cookie of the request
            const rf_token = req.cookies.refreshtoken

            if (!rf_token) return res.status(400).json({ msg: "Please login or sign up" })

            //check the refresh token is correct or not
            //if it correct then generate the new access token from user id 
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRECT, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login or sign up" })
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ user, accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            //get email and password from request body
            const { email, password } = req.body

            //check if email correct and exist or not 
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Login failed: Username or password is incorrect." })

            //check the password is correct or not
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Login failed: Username or password is incorrect." });

            //if password is correct then generate the new access and refresh token 
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            //save refresh token to cookie in client web browser
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ msg: "Login successful", accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.status(200).json({ msg: "Logout successful." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            //get user from request user
            //Object user bao gồm user id
            const user = req.user

            //check if user in request exist or not
            if (!user) return res.status(400).json({ msg: "Bad request." });

            //if user in request exist then find user by id into mongoDB
            const newUser = await Users.findById({ _id: user.id }).select('-password')

            //check user exist or not
            if (!newUser) return res.status(400).json({ msg: "User does not exist." });

            //if user exist then response user information
            res.json(newUser)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    addcart: async (req, res) => {
        try {
            const id = req.user.id

            const user = await Users.findById(id)

            if (!user) return res.status(400).json("Tài khoản không tồn tại.");

            await Users.findByIdAndUpdate({ _id: user._id }, { cart: req.body.cart })

            res.json({ msg: "Sản phẩm đã được thêm vào Giỏ hàng" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOrderHistory: async (req, res) => {
        try {
            const user = req.user

            if (!user) return res.status(400).json({ msg: "Vui lòng đăng nhập" });

            const payments = await Payments.find({ user_id: user.id })

            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRECT, { expiresIn: '7d' })
}

module.exports = userCtrl
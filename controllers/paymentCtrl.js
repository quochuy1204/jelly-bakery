const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')

const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({ msg: err.message });;
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("name email")

            if (!user) return res.status(400).json({ msg: "Vui lòng đăng nhập" });

            const { total, cart, paymentID, address } = req.body

            const { _id, name, email } = user

            const newPayment = new Payments({
                user_id: _id, name, email, cart, address, paymentID, total
            })

            cart.filter(item => {
                return updateSold(item._id, item.quantity, item.sold)
            })

            await newPayment.save()

            res.json({ msg: "Thanh toán thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

//Hàm này dùng để cập nhất số sản phẩm đã bán được của một sản phẩm
const updateSold = async (id, quantity, oldSold) => {
    await Products.findByIdAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl
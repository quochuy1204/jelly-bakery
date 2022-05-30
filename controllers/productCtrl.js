const productModel = require('../models/productModel')

//filter, sorting and pagination
//create APIfeatures class
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        // Lấy ra tất cả giá trị của QueryString Object
        const queryObj = { ...this.queryString }

        // Khởi tạo một array string có các giá trị page, sort, limit
        const excludedFileds = ['page', 'sort', 'limit']

        // Tìm trong Object queryObj xem có property nào có name = page, sort và limit thì xóa các property đó đi
        excludedFileds.forEach(el => delete (queryObj[el]))

        // Chuyển Object queryObj sang dạng string
        let queryStr = JSON.stringify(queryObj)

        // Tìm trong string queryStr xem có giá trị nào trùng với các từ gt, lt, gte, lte hay regex không,
        // Nếu có thì thêm vào trước các từ đó dấu $
        queryStr = queryStr.replace(/gt|lt|gte|lte|regex/g, match => '$' + match)

        // Gán cho hàm find() của Object Query một giá trị = với queryStr
        this.query.find(JSON.parse(queryStr))

        return this;

        // SAU KHI CHẠY HÀM filtering() THÌ FILTER QUERY CHO HÀM find() SẼ CÓ GIÁ TRỊ
        // category: '', title: {$regex: ''}
    }

    sorting() {
        //check if the sort query exist or not 
        if (this.queryString.sort) {

            //if the sort query exist then split the words between them and then join them together
            const sortBy = this.queryString.sort

            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProduct: async (req, res) => {
        try {
            const features = new APIfeatures(productModel.find(), req.query)
                .filtering()
                .sorting()
                .paginating()

            console.log(features.filtering())

            //get all product from the database
            const products = await features.query //feateure.query will response the products

            //response all of the product 
            res.json({
                status: 'success',
                result: products.length,
                products: products

            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    addProduct: async (req, res) => {
        try {
            //get product's information from the request body
            const { product_id, title, content, description, price, images, category } = req.body

            //check if the images exist or not
            if (!images) {
                return res.status(400).json({ msg: "Upload the product's images." });
            }

            //use findOne method to find the product in database with product_id
            const product = await productModel.findOne({ product_id })

            //check if the new product exist or not
            if (product) {
                return res.status(400).json({ msg: "This product already exist." });
            }

            const newProduct = new productModel({
                product_id, title: title.toLowerCase(), content, description, price, images, category
            })

            //save the product into the database
            await newProduct.save()

            res.json({ msg: "Successful." })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            //get the product id from req.params.id
            const id = req.params.id

            //find and delete the product base on the product id 
            await productModel.findByIdAndDelete({ _id: id })

            res.json({ msg: "Successful." })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            //get the information need to be change in request body
            //Notice: We can not change the product_id
            const { title, content, description, images, category, price } = req.body

            //get the _id from the request paramter
            const id = req.params.id

            //check the images exist or not
            if (!images) {
                return res.status(400).json({ msg: "Please upload the product's images." });
            }

            //find the product base on the _id and update that product
            await productModel.findByIdAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), content, description, images, category, price
            })

            res.json({ msg: "Successful." })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = productCtrl
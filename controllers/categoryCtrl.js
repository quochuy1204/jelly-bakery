const CategoryModel = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            //get categories into the database then response to client 
            const categories = await CategoryModel.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    addCategory: async (req, res) => {
        try {
            //get name of the category from request body
            const { name } = req.body

            //check if the category exist or not
            if (!name) return res.status(400).json({ msg: "Please fill all the field." });

            //check into the mongoDB whether the category exist or not
            const category = await CategoryModel.findOne({ name })

            //if the category already exist then return message 
            if (category) return res.status(400).json({ msg: "Invalid category name. Please try it again." });

            //if the category is valid then const new category 
            const newCategory = new CategoryModel({
                name
            })

            //save the new catogory into mongoDB
            await newCategory.save()
            res.json({ msg: "Đã thêm danh mục" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await CategoryModel.findByIdAndDelete(req.params.id)
            res.json({ msg: "Đã xóa danh mục" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    editCategory: async (req, res) => {
        try {
            const { name } = req.body
            await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, { name })
            res.json({ msg: "Đã cập nhật danh mục" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = categoryCtrl
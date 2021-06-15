const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const authToken = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(authToken, authAdmin, categoryCtrl.addCategory)
router.route('/category/:id')
    .delete(authToken, authAdmin, categoryCtrl.deleteCategory)
    .put(authToken, authAdmin, categoryCtrl.editCategory)
module.exports = router
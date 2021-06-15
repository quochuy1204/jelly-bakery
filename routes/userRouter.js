const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.get('/refresh_token', userCtrl.refreshtoken)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/infor', auth, userCtrl.getUser)
router.patch('/addcart', auth, userCtrl.addcart)
router.get('/history', auth, userCtrl.getOrderHistory)

module.exports = router
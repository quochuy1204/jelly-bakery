const router = require('express').Router()
const testCtrl = require('../controllers/testCtrl')
const auth = require('../middleware/auth')

router.get('/testServer', testCtrl.testServer)
router.get('/testAuth', auth, testCtrl.testAuth)

module.exports = router
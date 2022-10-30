const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')
const { upload } = require('../controllers')

const router = Router()

router.post('/', upload)

module.exports = router

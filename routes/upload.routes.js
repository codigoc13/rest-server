const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')
const { uploadFile } = require('../controllers')

const router = Router()

router.post('/', uploadFile)

module.exports = router

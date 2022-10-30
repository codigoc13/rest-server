const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')
const { allowedCollections } = require('../helpers')
const { upload, updateImg } = require('../controllers')

const router = Router()

router.post('/', upload)

router.put(
  '/:collection/:id',
  [
    check('id', `El ID no es válido`).isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImg
)

module.exports = router

const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth.controller')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
  ],
  login
)

router.post(
  '/google',
  [
    check('id_token', 'id_token de Google es necesario').not().isEmpty(),
    validateFields,
  ],
  googleSignIn
)

module.exports = router

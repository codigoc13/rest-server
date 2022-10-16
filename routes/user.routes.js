const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')

const router = Router()

router.get('/', getUsers)

router.post(
  '/',
  [check('email', 'El correo no es válido').isEmail()],
  createUser
)

router.put('/:id', updateUser)

router.delete('/', deleteUser)

module.exports = router

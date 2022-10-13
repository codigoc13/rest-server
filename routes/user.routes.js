const { Router } = require('express')
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')

const router = Router()

router.get('/', getUsers)

router.post('/', createUser)

router.put('/', updateUser)

router.delete('/', deleteUser)

module.exports = router

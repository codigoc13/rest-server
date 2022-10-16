const { Router } = require('express')
const { check } = require('express-validator')

const {
  isValidRole,
  emailExists,
  userByIdExists,
} = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')

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
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passsword es obligatorio').not().isEmpty(),
    check('password', 'El passsword debe ser de 6 letras o más').isLength({
      min: 6,
    }),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExists),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('role').custom(isValidRole),
    validateFields,
  ],
  createUser
)

router.put(
  '/:id',
  [
    check('id', `El ID no es válido`).isMongoId(),
    check('id').custom(userByIdExists),
    check('role').custom(isValidRole),
    validateFields,
  ],
  updateUser
)

router.delete('/', deleteUser)

module.exports = router

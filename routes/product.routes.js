/**
 *
 *  name: String - required: true
 *  description: String
 *  available: Boolean, default: true
 *  price: Number - default : 0
 *  status: Boolean - default : true - required: true
 *  user : Schema.Types.ObjectId - required: true
 *  category: Schema.Types.ObjectId - required: true
 *  created_at: Date - required
 *  modified_at: Date - required
 */

const { Router } = require('express')
const { check } = require('express-validator')

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProdut,
} = require('../controllers/product-controller')
const {
  categoryByIdExists,
  productByIdExists,
  userByIdExists,
} = require('../helpers/db-validators')

const { validateFields, validateJWT, isRole } = require('../middlewares')

const router = Router()

// Obtener productos paginados - público
router.get('/', getProducts)

// Obtener producto por id - público
router.get(
  '/:id',
  [
    check('id', 'El ID del producto no es válido').isMongoId(),
    check('id').custom(productByIdExists),
    validateFields,
  ],
  getProductById
)

// Crear producto - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'El ID de la categoría es requerido').not().isEmpty(),
    check('category', 'El ID de la categoría no es válido').isMongoId(),
    check('category').custom(categoryByIdExists),
    validateFields,
  ],
  createProduct
)

// Actualizar producto - privado - cualquier persona con un token válido
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(productByIdExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoría es requerida').not().isEmpty(),
    check('category', 'El ID de categoría no es válido').isMongoId(),
    check('category').custom(categoryByIdExists),
    validateFields,
  ],
  updateProduct
)

// Eliminar producto por di - privado - Admin
router.delete(
  '/:id',
  [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(productByIdExists),
    validateFields,
  ],
  deleteProdut
)

module.exports = router

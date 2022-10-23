const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validateJWT } = require('../middlewares')
const { createCategory } = require('../controllers/category.controller')

const router = Router()

// Obtener todas las categorías - público

// Obtener una categoría por id - público

// Crear categoría - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  createCategory
)

// Actualizar una categoría por id - privado - cualquier persona con un token válido

// Eliminar una categorpia por id - privado - Admin

module.exports = router

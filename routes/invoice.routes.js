const { Router } = require('express')
const { check } = require('express-validator')
const {
  getInvoices,
  createInvoices,
} = require('../controllers/invoice.controller')

const router = Router()

router.get('/', getInvoices)

router.post('/', createInvoices)

module.exports = router

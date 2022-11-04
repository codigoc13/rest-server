const { request, response } = require('express')
const { DateTime } = require('luxon')

const { isObjectId } = require('../helpers/validate-object-id')
const { Invoice, User, Product } = require('../models')

const getInvoices = async (req = request, res = response) => {
  try {
    const invoices = await Invoice.find({ status: true })
      .populate('user')
      .populate('products')

    res.status(200).json({
      total: invoices.length,
      invoices,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const createInvoices = async (req = request, res = response) => {
  try {
    const data = {
      user: '',
      products: [],
      createdAt: '',
      totalPrice: 0,
    }
    const { user: userId, products: productsIds } = req.body

    if (!isObjectId(userId)) {
      return res.status(400).json({
        msg: 'Debe ser un id Mongo',
      })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        msg: `No existe un usuario con id ${userId} en la BD`,
      })
    }
    data.user = user._id

    const invalidIds = productsIds.filter((productId) => {
      if (!isObjectId(productId)) {
        return productId
      }
    })

    if (invalidIds.length > 0) {
      return res.status(400).json({
        msg: 'Debe ser id de mongo válidos',
        invalidIds,
      })
    }

    const productsDB = await Product.find({ _id: { $in: productsIds } })
    const productsIdsDB = productsDB.map((productDB) => productDB._id.valueOf())
    const productsIdsNotFound = productsIds.filter((productId) => {
      if (!productsIdsDB.includes(productId)) {
        return productId
      }
    })

    if (productsIdsNotFound.length > 0) {
      return res.status(400).json({
        msg: 'Los siguiente productos no existen en la BD',
        productsIdsNotFound,
      })
    }

    data.totalPrice = productsDB.reduce((a, b) => a.price + b.price)
    data.products = productsDB
    data.createdAt = DateTime.now()

    const invoice = new Invoice(data)
    invoice.save()

    res.status(200).json({
      invoice,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getInvoices,
  createInvoices,
}

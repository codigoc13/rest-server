const { request, response } = require('express')
const { User } = require('../models')
const { ObjectId } = require('mongoose').Types

const allowedCollections = ['users', 'categories', 'products', 'roles']

const searchUsers = async (searchTerm = '', res = response) => {
  try {
    const isMongoId = ObjectId.isValid(searchTerm)
    if (isMongoId) {
      const user = await User.findById(searchTerm)
      return res.status(200).json({
        results: user ? [user] : [],
      })
    }

    const regex = new RegExp(searchTerm, 'i')

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    })
    res.status(200).json({
      quantity: users.length,
      results: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const search = (req = request, res = response) => {
  try {
    const { collection, searchTerm } = req.params

    if (!allowedCollections.includes(collection)) {
      return res.status(400).json({
        msg: 'Colección de búsqueda no existe',
        allowedCollections,
      })
    }

    switch (collection) {
      case 'users':
        searchUsers(searchTerm, res)
        break
      case 'categories':
        break
      case 'products':
        break
      default:
        res.status(500).json({
          msg: 'Búsqueda por hacer',
        })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  search,
}

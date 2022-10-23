const { request, response } = require('express')
const { Category } = require('../models')

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.trim().toUpperCase()
  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name} ya existe`,
    })
  }

  const data = { name, user: req.uid }

  const category = new Category(data)
  category.save()

  res.status(201).json({
    category,
  })
}

module.exports = {
  createCategory,
}

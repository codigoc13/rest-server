const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const getUsers = async (req = request, res = response) => {
  let { from = 0, quantity = 2 } = req.query
  from = from <= 0 || isNaN(from) ? 0 : from - 1

  const users = await User.find().skip(from).limit(quantity)
  res.json({
    users,
  })
}

const createUser = async (req, res = response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
  await user.save()

  res.status(201).json({
    user,
  })
}

const updateUser = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, ...remainder } = req.body

  if (password) {
    remainder.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
  }
  const user = await User.findByIdAndUpdate(id, remainder, { new: true })

  res.status(200).json({
    user,
  })
}

const deleteUser = (req, res = reponse) => {
  res.json({
    msg: 'delete API - controlador',
  })
}

module.exports = { getUsers, createUser, updateUser, deleteUser }

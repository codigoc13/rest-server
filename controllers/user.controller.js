const { request, response } = require('express')
const User = require('../models/user')

const getUsers = (req = request, res = response) => {
  const { name, lastname, age, city = 'Medellín' } = req.query
  res.json({
    msg: 'get API - controlador',
    name,
    lastname,
    age,
    city,
  })
}

const createUser = async (req, res = response) => {
  const body = req.body
  const user = new User(body)
  await user.save() // Cuando esto genera error rompe la app

  res.status(201).json({
    user,
  })
}

const updateUser = (req, res = response) => {
  const id = req.params.id
  res.status(400).json({
    msg: 'put API - controlador',
    id,
  })
}

const deleteUser = (req, res = reponse) => {
  res.json({
    msg: 'delete API - controlador',
  })
}

module.exports = { getUsers, createUser, updateUser, deleteUser }

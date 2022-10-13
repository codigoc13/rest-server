const { request, response } = require('express')

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

const createUser = (req, res = response) => {
  const { name, age } = req.body
  res.status(201).json({
    msg: 'post API - controlador',
    name,
    age,
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

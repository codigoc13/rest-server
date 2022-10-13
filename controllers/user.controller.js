const { response } = require('express')

const getUsers = (req, res = response) => {
  res.json({
    msg: 'get API - controlador',
  })
}

const createUser = (req, res = response) => {
  res.status(201).json({
    msg: 'post API - controlador',
  })
}

const updateUser = (req, res = response) => {
  res.status(400).json({
    msg: 'put API - controlador',
  })
}

const deleteUser = (req, res = reponse) => {
  res.json({
    msg: 'delete API - controlador',
  })
}

module.exports = { getUsers, createUser, updateUser, deleteUser }

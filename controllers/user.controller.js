const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { validationResult } = require('express-validator')

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  // Verificar si el correo ya existe en la BD
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    return res.status(400).json({
      mgs: 'Ese correo ya está registrado',
    })
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)
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

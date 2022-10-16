const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role })
  if (!existsRole) {
    throw new Error(`El rol ${role} no está registrado en la base de datos`)
  }
}

const emailExists = async (email = '') => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error(`El correo '${email}' ya está registrado`)
  }
}

const userByIdExists = async (id = '') => {
  console.log(id)
  const userExists = await User.findById(id)
  if (!userExists) {
    throw new Error(`Usuario con id '${id}' no existe en la base de datos`)
  }
}

module.exports = {
  isValidRole,
  emailExists,
  userByIdExists,
}
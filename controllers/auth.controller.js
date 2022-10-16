const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const login = async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    // Verificar si el email existe
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - email',
      })
    }

    // Verificar si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - status false',
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      })
    }

    // Generar el JWT

    res.json({
      msg: 'Login Ok',
      email,
      password,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Hubo un error, consulte al administrador de la app',
    })
  }
}

module.exports = {
  login,
}

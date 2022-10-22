const { request, response, json } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const generateJWT = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

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
    const token = await generateJWT(user.id)

    res.json({
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Hubo un error, consulte al administrador de la app',
    })
  }
}

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body

  try {
    const googleUser = await googleVerify(id_token)
    console.log(googleUser)
    res.json({
      msg: 'Todo OK',
      id_token,
    })
  } catch (error) {
    json.status(400).json({
      ok: false,
      msg: 'Token de Google no se pudo verificar',
    })
  }
}

module.exports = {
  login,
  googleSignIn,
}

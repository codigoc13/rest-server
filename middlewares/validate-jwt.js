const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req = request, res = response, next) => {
  const { token } = req.headers
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    })
  }

  // console.log(token)
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY)
    req.uid = uid
    // console.log(payload)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      msg: 'Token no válido',
    })
  }
}

module.exports = validateJWT

const { response, request } = require('express')

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authenticatedUser) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin primero validar el token',
    })
  }

  const { name, role } = req.authenticatedUser

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`,
    })
  }
  next()
}

module.exports = {
  isAdminRole,
}

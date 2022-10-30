const { request, response } = require('express')

const uploadFile = (req = request, res = response) => {
  try {
    res.json({
      msg: 'Cargar archivo',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  uploadFile,
}

const { request, response } = require('express')
const { uploadFile } = require('../helpers')

const upload = async (req = request, res = response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({ msg: 'No hay archivos en la petición' })
    }

    const fileName = await uploadFile(req.files)
    res.status(200).json({
      fileName,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  upload,
}

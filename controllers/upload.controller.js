const path = require('path')
const { request, response } = require('express')

const uploadFile = (req = request, res = response) => {
  try {
    if (!req.files.file || !req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json('No hay archivos en la petición')
    }

    const { file } = req.files
    const cutName = file.name.split('.')
    const extension = cutName[cutName.length - 1]

    // Validar la extensión

    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']
    if (!allowedExtensions.includes(extension)) {
      return res.status(400).json({
        msg: `La extensión '${extension}' no es permitida`,
        allowedExtensions,
      })
    }
    res.json({
      extension,
    })

    // const uploadPath = path.join(__dirname, '../uploads/', file.name)

    // file.mv(uploadPath, (err) => {
    //   if (err) {
    //     console.log(err)
    //     return res.status(500).json({ err })
    //   }

    //   res.status(200).json({
    //     msg: `Archivo subido a ${uploadPath}`,
    //   })
    // })
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

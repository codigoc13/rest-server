const { request, response } = require('express')
const path = require('path')
const fs = require('fs')

const { User, Product } = require('../models')
const { uploadFile } = require('../helpers')

const upload = async (req = request, res = response) => {
  try {
    // const fileName = await uploadFile(req.files, ['txt', 'md'], 'texts')
    const fileName = await uploadFile(req.files, undefined, 'imgs')
    res.status(200).json({
      fileName,
    })
  } catch (msg) {
    res.status(400).json({
      msg,
    })
  }
}

const updateImg = async (req = request, res = response) => {
  try {
    const { collection, id } = req.params

    let model
    let entity

    switch (collection) {
      case 'users':
        entity = 'user'
        model = await User.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`,
          })
        }
        break

      case 'products':
        entity = 'user'
        model = await Product.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          })
        }
        break

      default:
        return res.status(500).json({
          msg: `Por validar la colección ${collection}`,
        })
    }

    if (model.img) {
      const pathImg = path.join(__dirname, '../uploads', collection, model.img)
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg)
      }
    }

    const name = await uploadFile(req.files, undefined, collection)
    model.img = name

    await model.save()

    res.json({ entity, model })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error en el servidor' })
  }
}

const getImg = async (req = request, res = response) => {
  try {
    const { collection, id } = req.params

    let model
    let entity

    switch (collection) {
      case 'users':
        entity = 'user'
        model = await User.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`,
          })
        }
        break

      case 'products':
        entity = 'user'
        model = await Product.findById(id)
        if (!model) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          })
        }
        break

      default:
        return res.status(500).json({
          msg: `Por validar la colección ${collection}`,
        })
    }

    if (model.img) {
      const pathImg = path.join(__dirname, '../uploads', collection, model.img)
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
      }
    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImg)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error en el servidor' })
  }
}

module.exports = {
  upload,
  updateImg,
  getImg,
}

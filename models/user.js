/**
 * {
    name: 'nombre y apellido',
    email: 'email@gmail.com',
    password: 'lkdjfalskdgjaopiweaf65+',
    img: 'urldelaimagen',
    role: 'algún rol',
    estatus: false,
    google: false
    }
 * 
 */

const { Schema, model } = require('mongoose')

const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estatus: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
})

module.exports = model('Users', userSchema)

const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
})

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject()
  category.id = _id
  return category
}

module.exports = model('Category', CategorySchema)

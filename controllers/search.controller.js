const { request, response } = require('express')

const search = (req = request, res = response) => {
  try {
    const { collection, searchTerm } = req.params
    res.json({
      msg: 'buscando',
      collection,
      searchTerm,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  search,
}

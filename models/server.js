const express = require('express')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    // Middlewares
    this.middlewares()

    // Rutas de mi app
    this.routes()
  }

  middlewares() {
    // Directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'get API',
      })
    })

    this.app.put('/api', (req, res) => {
      res.status(400).json({
        msg: 'put API',
      })
    })

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        msg: 'post API',
      })
    })

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'delete API',
      })
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../src/database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.app = {
      authPath : '/api/auth',
      beerPath : '/api/beer'
    }

    // Conectar a la base de datos
    this.connectDB();
    
    // Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.path.authPath, require('./routes/auth'));
    this.app.use(this.path.beerPath, require('./routes/beer'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }

}

module.exports = Server;
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../src/database/config');

require('dotenv').config();

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.pathList = {
      authPath : '/api/auth',
      beerPath : '/api/beer',
      categoriasPath : '/api/categorias',
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
    this.app.use(this.pathList.authPath, require('./routes/auth'));
    this.app.use(this.pathList.categoriasPath, require('./routes/categorias'));
    this.app.use(this.pathList.beerPath, require('./routes/beer'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }

}

module.exports = Server;
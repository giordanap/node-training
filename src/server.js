const express = require('express');
const cors = require('cors');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.beerPath = '/api/beer';
    
    // Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
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
    this.app.use(this.beerPath, require('./routes/beer'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }

}

module.exports = Server;
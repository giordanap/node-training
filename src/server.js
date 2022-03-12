const express = require('express');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    
    // Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    
    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        msgApi: 'Get Response'
      });
    });
    
    this.app.put('/api', (req, res) => {
      res.json({
        msgApi: 'Put Response'
      });
    });
    
    this.app.post('/api', (req, res) => {
      res.json({
        msgApi: 'Post Response'
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        msgApi: 'Delete Response'
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });
  }

}

module.exports = Server;
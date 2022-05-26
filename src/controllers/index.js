
const auth = require('./auth');
const beer = require('./beer');
const categorias = require('./categorias');
const producto = require('./producto');
const buscar = require('./buscar');
const cargarArchivo = require('./uploads');
  
  module.exports = {
    ...auth,
    ...beer,
    ...categorias,
    ...producto,
    ...buscar,
    ...cargarArchivo,
  }
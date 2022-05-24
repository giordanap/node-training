
const { 
    login,
    googleSignIn,
 } = require('./auth');
const {
    beersGet,
    beerGet,
    beerPut,
    beerPost,
    beerDelete,
    beerPatch,
  } = require('./beer');
const {
    cateogirasGet,
    cateogirasPost,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
  } = require('./categorias');
const {
    obtenerProductos,
    obtenerProducto,
    productoPost,
    actualizarProducto,
    borrarProducto,
  } = require('./producto');

module.exports = {
    login,
    googleSignIn,
    beersGet,
    beerGet,
    beerPut,
    beerPost,
    beerDelete,
    beerPatch,
    cateogirasGet,
    cateogirasPost,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    obtenerProductos,
    obtenerProducto,
    productoPost,
    actualizarProducto,
    borrarProducto,
}
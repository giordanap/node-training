
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
  } = require('./categorias');

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
}
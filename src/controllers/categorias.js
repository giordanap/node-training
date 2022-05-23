const { request, response } = require('express');
const { Categorias } = require('../models');

const cateogirasGet = async(req = request, res = response) => {
  res.json({
    msg: 'Biriiiiiiiiii'
  });
}

const cateogirasPost = async(req = request, res = response) => {

  const name = req.body.name.toUpperCase();
  const categoriaDB = await Categorias.findOne({ name });

  if ( categoriaDB ) {
    return res.json({
      msg: `La categoria ${ categoriaDB.name } ya existe`
    });
  }

  const data = {
    name,
    beer: req.beer._id
  }

  const categoria = new Categoria( data );
  await categoria.save();

  res.status(201).json(categoria);

}

module.exports = {
  cateogirasGet,
  cateogirasPost,
};
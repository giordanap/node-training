const { request, response } = require('express');
const { Categorias } = require('../models');

const cateogirasGet = async(req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [totalRows, categorias] = await Promise.all([
    Categorias.countDocuments(),
    Categorias.find(query)
      .populate('beer', 'name')
      .skip(from)
      .limit(limit)
  ]);

  res.json({
    totalRows,
    categorias
  });
}

const obtenerCategoria = async(req = request, res = response) => {
  
  const { id } = req.params;
  const categoria = await Categorias.findById(id)
                      .populate('beer', 'name');
  
  res.json( categoria );
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

  const categoria = new Categorias( data );
  await categoria.save();

  res.status(201).json(categoria);

}

const actualizarCategoria = async(req = request, res = response) => {

  const { id } = req.params;
  const { _id, state, beer, ...payload } = req.body;

  payload.name = payload.name.toUpperCase();
  
  const categoria = await Categorias.findByIdAndUpdate(id, payload);

  res.json({
    msg: 'Put Response from Controller',
    categoria
  });
}

const borrarCategoria = async(req, res = response) => {

  const { id } = req.params;
  const categoria = await Categorias.findByIdAndUpdate(id, { state: false }, { new: true })
                      .populate('beer', 'name');

  res.json( categoria );
}

module.exports = {
  cateogirasGet,
  cateogirasPost,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
const { request, response } = require('express');
const { Producto } = require('../models');

const obtenerProductos = async(req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [totalRows, producto] = await Promise.all([
    Producto.countDocuments(),
    Producto.find(query)
      .populate('beer', 'name')
      .populate('categoria', 'name')
      .skip(from)
      .limit(limit)
  ]);

  res.json({
    totalRows,
    producto
  });
}

const obtenerProducto = async(req = request, res = response) => {
  
  const { id } = req.params;
  const Producto = await Producto.findById(id)
                      .populate('beer', 'name')
                      .populate('categoria', 'name');
  
  res.json( Producto );
}

const productoPost = async(req = request, res = response) => {

  const { beer, state, name, ...body } = req.body;
  const productoDB = await Producto.findOne({ name });

  if ( productoDB ) {
    return res.json({
      msg: `El Producto ${ productoDB.name } ya existe`
    });
  }

  const data = {
    name: name.toUpperCase(),
    beer: req.beer._id,
    ...body
  }

  const producto = new Producto( data );
  await producto.save();

  res.status(201).json(producto);

}

const actualizarProducto = async(req = request, res = response) => {

  const { id } = req.params;
  const { _id, state, beer, categoria, ...payload } = req.body;

  payload.name = payload.name.toUpperCase();
  
  const Producto = await Producto.findByIdAndUpdate(id, payload);

  res.json({
    msg: 'Put Response from Controller',
    Producto
  });
}

const borrarProducto = async(req, res = response) => {

  const { id } = req.params;
  const Producto = await Producto.findByIdAndUpdate(id, { state: false }, { new: true })
                      .populate('beer', 'name')
                      .populate('categoria', 'name');

  res.json( Producto );
}

module.exports = {
  obtenerProductos,
  obtenerProducto,
  productoPost,
  actualizarProducto,
  borrarProducto,
};
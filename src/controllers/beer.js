const { request, response } = require('express');
const Beer = require('../models/beer');

const beerGet = (req = request, res = response) => {
  const {q, nombre, apiKey} = req.query;
  res.json({
    msg: 'Get Response from Controller',
      q, nombre, apiKey
  });
}

const beerPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'Put Response from Controller',
    id
  });
}

const beerPost = async(req = request, res = response) => {
  const { body } = req;
  const beer = new Beer(body);
  console.log(body);
  await beer.save();
  res.json({
    msg: 'Post Response from Controller',
    beer
  });
}

const beerDelete = (req, res = response) => {
  res.json({
    msg: 'Delete Response from Controller'
  });
}

const beerPatch = (req, res = response) => {
  res.json({
    msg: 'Patch Response from Controller'
  });
}

module.exports = {
  beerGet,
  beerPut,
  beerPost,
  beerDelete,
  beerPatch,
}
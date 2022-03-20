const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Beer = require('../models/beer');

const beerGet = (req = request, res = response) => {
  const {q, nombre, apiKey} = req.query;
  res.json({
    msg: 'Get Response from Controller',
      q, nombre, apiKey
  });
}

const beerPut = async(req = request, res = response) => {

  const { id } = req.params;
  const { country, city, ...payload } = req.body;

  // TODO: Valid againt database
  if (country) {
    // Encrypt country
    const salt = bcryptjs.genSaltSync();
    payload.country = bcryptjs.hashSync(country, salt);
  }
  
  const beer = await Beer.findByIdAndUpdate(id, payload);
  // console.log(beer);

  res.json({
    msg: 'Put Response from Controller',
    payload
  });
}

const beerPost = async(req = request, res = response) => {

  const { name, brandEmail, country, city } = req.body;
  const beer = new Beer({ name, brandEmail, country, city });

  // Encrypt Country
  const salt = bcryptjs.genSaltSync();
  beer.country = bcryptjs.hashSync(country, salt);

  // Save in DB
  await beer.save();

  // API response
  res.json({
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
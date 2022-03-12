const { request, response } = require('express');

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

const beerPost = (req = request, res = response) => {
  console.log(req.body);
  res.json({
    msg: 'Post Response from Controller'
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
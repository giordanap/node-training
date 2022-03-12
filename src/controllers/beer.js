const { response } = require('express');

const beerGet = (req, res = response) => {
  res.json({
    msg: 'Get Response from Controller'
  });
}

const beerPut = (req, res = response) => {
  res.json({
    msg: 'Put Response from Controller'
  });
}

const beerPost = (req, res = response) => {
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
const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

  const { q, nombre, apikey = 'A32DF23'} = req.query;

  // devuelve un objeto en un JSON
  res.json({
    msg:'get API - Controlador',
    q,
    nombre,
    apikey
  });
}

const usuariosPut = (req, res = response) => {

  const { id } = req.params;

  // devuelve un objeto en un JSON
  res.json({
    msg:'put API - controller',
    id
  });
}

const usuariosPost = (req, res = response) => {

  // cuerpo de la peticion http
  const body = req.body;

  // devuelve un objeto en un JSON
  res.json({
    msg:'post API - controller',
    body
  });
}

const usuariosPatch = (req, res = response) => {

  // devuelve un objeto en un JSON
  res.json({
    msg:'patch API - controller'
  });
}

const usuariosDelete = (req, res = response) => {

  // devuelve un objeto en un JSON
  res.json({
    msg:'delete API - controller'
  });
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete
}

const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

  // const { q, nombre, apikey = 'A32DF23'} = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);


  // Destructuracion de arreglos de las promesas
  const [ total, usuarios ] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

  // devuelve un objeto en un JSON
  res.json({
    total,
    usuarios
  });
}

const usuariosPut = async(req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if( password ){
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  // devuelve un objeto en un JSON
  res.json(usuario);
}

const usuariosPost = async(req, res = response) => {


  // cuerpo de la peticion http
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  // guardar el registro
  await usuario.save();

  // devuelve un objeto en un JSON
  res.json({
    msg:'post API - controller',
    usuario
  });
}

const usuariosPatch = (req, res = response) => {

  // devuelve un objeto en un JSON
  res.json({
    msg:'patch API - controller'
  });
}

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );


  //Borrado => cambio de estado
  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

  // devuelve un objeto en un JSON
  res.json(usuario);
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete
}

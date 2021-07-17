const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// Peticion GET
router.get('/', usuariosGet);

// Peticion PUT
router.put('/:id', usuariosPut);

// Peticion POST
router.post('/', usuariosPost);

// Peticion PATCH
router.patch('/', usuariosPatch);

// Peticion DELETE
router.delete('/', usuariosDelete);

module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');

//validarCampos lo usaremos para revisar los errores recogidos por los checks y darles next a los middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// Peticion GET
router.get('/', usuariosGet);

// Peticion PUT
router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom( esRoleValido ),
  validarCampos
],usuariosPut);

// Peticion POST
// con el middleware del check reviso si email esta bien
//y lo acumulo en los errores
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  // Verificar si el correo existe
  check('correo').custom( emailExiste ),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  // Hacemos un custom de express validator para validar un tipo de rol que este en la bd
  // (rol) => esRoleValido(rol) === esRoleValido
  check('rol').custom( esRoleValido ),
  validarCampos
], usuariosPost);

// Peticion PATCH
router.patch('/', usuariosPatch);

// Peticion DELETE
router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],usuariosDelete);

module.exports = router;

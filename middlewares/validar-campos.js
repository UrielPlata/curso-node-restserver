const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

  // Verificamos si hay errores en la validacion
  // de lo que se envia
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json(errors);
  }

  // El next es necesario para un middleware porque le dice que continue con el que sigue
  next();

}

module.exports = {
  validarCampos
}

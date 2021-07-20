const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default:true
  },
  google: {
    type: Boolean,
    default: false
  }
});

// Podemos sobreescribir los metodos de mongoose para
// personalizarlos o escribir los nuestros propios
// Ademas es importante que sea una funcion normal
// porque si no el objeto this ya no apuntaria a la instancia creada
UsuarioSchema.methods.toJSON = function() {
  // removemos la version, el password y regresamos el usuario
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );

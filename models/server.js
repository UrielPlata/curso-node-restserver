const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config');

class Server {

  // metodo constructor de la clase
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // Conectar a base de datos
    this.conectarDB();

    //Midleware
    // funciones que añaden funcionalidad a mi webserver
    // y se ejecutan cuando arranca el servidor
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares(){

    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json() );

    // Directorio publico
    this.app.use(express.static('public') );
  }

  //metodo para llamar a mis rutas
  routes(){

    this.app.use(this.usuariosPath, require('../routes/user'))
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en puerto', this.port );
    });
  }

}

module.exports = Server;

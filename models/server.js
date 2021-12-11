const express = require('express');
const cors = require('cors');
class Server {
   usuarios;
   constructor(){
     this.app = express();
     this.port = process.env.PORT;
     this.usuariosPath = '/api/usuarios'
     //Middlewares
     this.middlewares();
     //Rutas de mi Aplicación
     this.routes();
   }
   middlewares(){
       //Cors
       this.app.use(cors())
       //Parseo y lectura del body
       this.app.use(express.json());
       //Directorio público
       this.app.use(express.static('public'));
   }

   routes(){
      this.app.use( this.usuariosPath,require('../routes/usuarios'))
   }
   listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
   }
}

module.exports = Server;
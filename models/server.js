const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.usuariosPath = "/api/users";
    this.authPath = "/api/auth";

    //conectar a base de datos
    this.conectarDB();

    //middlewares
    this.middelwares();

    //rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middelwares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {createServer} = require("http");

const { dbConnection } = require("../database/config");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {
      auth: "/api/auth",
      search: "/api/search",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      uploads: "/api/uploads"
    };

    //conectar a base de datos
    this.conectarDB();

    //middlewares
    this.middelwares();

    //rutas de mi aplicacion
    this.routes();

    //Socket
    this.sockets();
  }

  async conectarDB() {
    await dbConnection();
  }

  middelwares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));

    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

    sockets(){
    this.io.on("connection", (socket) => socketController(socket, this.io))
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;

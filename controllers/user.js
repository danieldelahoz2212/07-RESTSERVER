const { response } = require("express");
const bcrypt = require("bcryptjs");


const User = require("../models/user");

const useriosGet = (req, res) => {
  const { q, name = "no name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controller",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const useriosPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "put API - controller",
    id,
  });
};

const useriosPost = async (req, res) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Verificar si el correo existe
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya está registrado",
    });
  }

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Guardar en BD
  await user.save();
  res.json({
    msg: "post API - controller",
    user,
  });
};

const useriosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete API - controller",
  });
};

const useriosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "patch API - controller",
  });
};

module.exports = {
  useriosGet,
  useriosPut,
  useriosPost,
  useriosDelete,
  useriosPatch,
};

const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const user = require("../models/user");

const useriosGet = async (req = request, res = response) => {
  //const { q, name = "no name", apikey, page = 1, limit } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const users = await User.find().limit(Number(limit)).skip(Number(from));

  res.json({
    users,
  });
};

const useriosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  // TODO validar contra base de daos
  if (password) {
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);

  res.json({
    user,
  });
};

const useriosPost = async (req, res) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

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

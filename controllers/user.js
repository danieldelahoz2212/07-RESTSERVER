const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const user = require("../models/user");

const useriosGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [total, user] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(from)),
  ]);

  res.json({
    total,
    user,
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

const useriosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  const user = await User.findByIdAndUpdate(id, { estado: false });

  res.json(user);
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

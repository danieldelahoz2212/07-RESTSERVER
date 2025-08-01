const { response } = require("express");

const useriosGet = (req, res) => {
  const { q, nombre = "no name", apikey, page = 1, limit = 10 } = req.query;
  res.json({
    msg: "get API - controller",
    q,
    nombre,
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

const useriosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "post API - controller",
    nombre,
    edad,
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

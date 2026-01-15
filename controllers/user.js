const { response } = require("express");
const User = require("../models/user");

const useriosGet = (req, res) => {
  const { q, name = "no name", apikey, page = 1, limit = 10 } = req.query;
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
  const body = req.body;
  const user = new User(body);
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

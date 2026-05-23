const { response } = require("express");
const jwt = require("jsonwebtoken");

const user = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // leer el usuario que corresponde al uid
    req.user = await user.findById(uid);
    // si el usuario no existe
    if (!req.user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }
    // Verificar si el uid tiene estado true
    if (!req.user.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }
    // si todo es correcto
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};

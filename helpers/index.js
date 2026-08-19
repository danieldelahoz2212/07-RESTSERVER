const dbValidate = require("./db-validators");
const generarJWT = require("./generar-jwt");
const comporbarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const uploadFile = require("./upload-file");
const coleccionesPermitidas = require("./db-validators");

module.exports = {
  ...dbValidate,
  ...generarJWT,
  ...comporbarJWT,
  ...googleVerify,
  ...uploadFile,
  ...coleccionesPermitidas,
};

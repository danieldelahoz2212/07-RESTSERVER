const dbValidate = require("./db-validators");
const generarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const uploadFile = require("./upload-file");

module.exports = {
  ...dbValidate,
  ...generarJWT,
  ...googleVerify,
  ...uploadFile,
};

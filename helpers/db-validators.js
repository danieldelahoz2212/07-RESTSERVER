const Role = require("../models/role");
const User = require("../models/user");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

// Verificar si el correo existe
const emailExiste = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
};

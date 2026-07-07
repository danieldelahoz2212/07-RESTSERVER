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

// Verificar si el id existe
const existeUsuarioPorId = async (id = "") => {
  const existeUsuari = await User.findById(id);
  if (!existeUsuari) {
    throw new Error(`El id no existe ${id}`);
  }
};

// Verificar si la categoria existe
const existeCategoriaPorId = async (id = "") => {
  const existeCategoria = await Category.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
};

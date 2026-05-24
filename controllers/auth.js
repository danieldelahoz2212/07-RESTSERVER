const { response } = require("express");
const User = require("../models/user");
const { generarJWT } = require("../helpers/generar-JWT");
const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // Si el usuario esta activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar si el password es correcto
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      // Tengo que crear el usuario
      const data = {
        name,
        email,
        password: ":P",
        img: picture,
        rol: "USER_ROLE",
        google: true,
      };
      user = new User(data);
      await user.save();
    }else{
      // Si el usuario en DB
      user.google = true;
      await user.save();
    }

    // Si el usuario en DB
    if (!user.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};

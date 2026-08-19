const { Router } = require("express");
const { check } = require("express-validator");
const { validatedFields, validateJWT } = require("../middlewares");

const { login, googleSignIn, renewToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validatedFields
  ],
  login,
);

router.post(
  "/google",
  [
    check("id_token", "id_token es necesario").not().isEmpty(),
    validatedFields
  ],
  googleSignIn,
);

router.get("/", validateJWT, renewToken)

router.get("/config", (req, res) => {
  res.json({ googleClientId: process.env.GOOGLE_CLIENT_ID });
});

module.exports = router;

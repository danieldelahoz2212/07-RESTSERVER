const { Router } = require("express");
const { check } = require("express-validator");
const { validatedFields } = require("../middlewares/validate_fields");

const { login, googleSignIn } = require("../controllers/auth");

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

router.get("/config", (req, res) => {
  res.json({ googleClientId: process.env.GOOGLE_CLIENT_ID });
});

module.exports = router;

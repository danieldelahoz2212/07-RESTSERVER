const { Router } = require("express");
const { check } = require("express-validator");
const { validatedFields } = require("../middlewares/validate_fields");

const { login } = require("../controllers/auth");

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

module.exports = router;

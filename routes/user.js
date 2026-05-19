const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields } = require("../middlewares/validate_fields");
const { esRoleValido, emailExiste } = require("../helpers/db-validators");

const {
  useriosGet,
  useriosPut,
  useriosPost,
  useriosDelete,
  useriosPatch,
} = require("../controllers/user");

const router = Router();

router.get(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
  ],
  useriosGet,
);

router.put("/:id", useriosPut);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("email").custom(emailExiste),
    check("password", "La contraseña debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    //check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validatedFields,
  ],
  useriosPost,
);

router.delete("/:id", useriosDelete);

router.patch("/:id", useriosPatch);

module.exports = router;

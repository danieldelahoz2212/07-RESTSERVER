const { Router } = require("express");
const { check } = require("express-validator");

const {
  validatedFields,
  validateJWT,
  validateRoles,
  hasRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

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

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validatedFields,
  ],
  useriosPut,
);

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

router.delete(
  "/:id",
  [
    validateJWT,
    //validateRoles,
    hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validatedFields,
  ],
  useriosDelete,
);

router.patch("/:id", useriosPatch);

module.exports = router;

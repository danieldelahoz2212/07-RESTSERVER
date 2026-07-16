const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields, validateJWT, hasRole } = require("../middlewares");
const {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const {
  existeCategoriaPorId,
  esRoleValido,
} = require("../helpers/db-validators");

const router = Router();

//obtener todas las categorias - publico
router.get("/", findCategories);

//obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validateJWT,
  ],
  findCategory,
);

//crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validatedFields,
    validateJWT,
  ],
  createCategory,
);

//actualizar categoria - privado - cualquier persona con un token valido
router.put(
  "/:id",
  [
    validateJWT,
    validatedFields,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
  ],
  updateCategory,
);

//borrar categoria - privado - solo admin
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    hasRole("ADMIN_ROLE"),
  ],
  deleteCategory,
);

module.exports = router;

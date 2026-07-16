const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields, validateJWT, hasRole } = require("../middlewares");

const {
  createProduct,
  findProducts,
  findProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const {
  existeProductoPorId,
  esRoleValido,
} = require("../helpers/db-validators");

const router = Router();

//obtener todas las productos - publico
router.get("/", findProducts);

router.get(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
  ],
  findProduct,
);

//crear producto - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validatedFields,
  ],
  createProduct,
);

//actualizar producto - privado - cualquier persona con un token valido
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validatedFields,
  ],
  updateProduct,
);

//borrar producto - privado - solo admin
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    hasRole("ADMIN_ROLE"),
  ],
  deleteProduct,
);

module.exports = router;

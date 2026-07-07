const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields, validateJWT } = require("../middlewares");
const { createCategory, findCategories, findCategory, updateCategory, deleteCategory } = require("../controllers/categories");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

//obtener todas las categorias - publico
router.get("/", findCategories);

//obtener una categoria por id - publico
router.get("/:id",[
  check('id').custom(existeCategoriaPorId),
], findCategory);

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
router.put("/:id", [
  check('id').custom(existeCategoriaPorId),
], updateCategory);

//borrar categoria - privado - solo admin
router.delete("/:id", (req, res) => {
  res.json({
    msg: "delete API - controller",
  });
});

module.exports = router;

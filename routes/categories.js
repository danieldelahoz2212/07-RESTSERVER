const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields, validateJWT } = require("../middlewares");
const { createCategory } = require("../controllers/categories");

const router = Router();

//obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json({
    msg: "get API - controller",
  });
});

//obtener una categoria por id - publico
router.get("/:id",[
  check('id').custom(existCategory)
], (req, res) => {
  res.json({
    msg: "get API - controller",
  });
});

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
router.put("/:id", (req, res) => {
  res.json({
    msg: "put API - controller",
  });
});

//borrar categoria - privado - solo admin
router.delete("/:id", (req, res) => {
  res.json({
    msg: "delete API - controller",
  });
});

module.exports = router;

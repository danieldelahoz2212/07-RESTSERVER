const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields, validateFiles } = require("../middlewares/index");
const { fileUpload, updateImage, showFiles, updateImageCloudinary } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", validateFiles, fileUpload);

router.put(
  "/:collection/:id",
  [
    validateFiles,
    check("id", "Id must be a valid Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      coleccionesPermitidas(c, ["users", "products"]),
    ),
    validatedFields,
  ],
  updateImageCloudinary,
  // updateImage,
);

router.get(  "/:collection/:id",
  [
    check("id", "Id must be a valid Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      coleccionesPermitidas(c, ["users", "products"]),
    ),
    validatedFields,
  ],
  showFiles
)

module.exports = router;

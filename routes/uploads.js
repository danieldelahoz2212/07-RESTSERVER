const { Router } = require("express");
const { check } = require("express-validator");

const { validatedFields } = require("../middlewares/validate_fields");
const { fileUpload } = require("../controllers/uploads");

const router = Router();

router.post("/", fileUpload);

module.exports = router;

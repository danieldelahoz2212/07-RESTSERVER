const { Router } = require("express");
const {
  useriosGet,
  useriosPut,
  useriosPost,
  useriosDelete,
  useriosPatch,
} = require("../controllers/user");
const router = Router();

router.get("/", useriosGet);

router.put("/:id", useriosPut);

router.post("/", useriosPost);

router.delete("/:id", useriosDelete);

router.patch("/:id", useriosPatch);

module.exports = router;

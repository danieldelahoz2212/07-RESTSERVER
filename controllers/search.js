const { response } = require("express");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const findUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
};

const search = async (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      break;

    case "categories":
      break;

    case "products":
      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido hacer esta busqueda",
      });
  }

  res.json({
    collection,
    term,
  });
};

module.exports = {
  search,
};

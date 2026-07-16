const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const findUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ estado: true }],
  });

  return res.json({
    results: users,
  });
};

const findCategories = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const categories = await Category.find({ name: regex, estado: true });

  return res.json({
    results: categories,
  });
};

const findProducts = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term);
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const products = await Product.find({ name: regex, estado: true }).populate(
    "category",
    "name",
  );

  return res.json({
    results: products,
  });
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
      return await findUsers(term, res);

    case "categories":
      return await findCategories(term, res);

    case "products":
      return await findProducts(term, res);

    default:
      return res.status(500).json({
        msg: "Se me olvido hacer esta busqueda",
      });
  }
};

module.exports = {
  search,
};

const { response } = require("express");
const { Category } = require("../models");

//Crear categoria - paginado - total - populate
const findCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, categories] = await Promise.all([
    Category.countDocuments({ state: true }),
    Category.find({ state: true })
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};
S;

//obtener categorias - populate {}
const findCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    name,
    description: req.body.description,
    user: req.user._id,
  };

  const category = new Category(data);

  //Guardar en BD
  await category.save();

  res.status(201).json(category);
};

// actualizar categoria
const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;
  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

// borrar categoria
const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

  res.json(category);
};

module.exports = {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};

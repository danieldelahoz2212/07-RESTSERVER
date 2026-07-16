const { response } = require("express");
const { Product } = require("../models");

const findProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

//obtener productos - populate {}
const findProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("user", "name");

  res.json(product);
};

//Crear producto - paginado - total - populate
const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  //Guardar en BD
  await product.save();

  res.status(201).json(product);
};

// actualizar producto
const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

// borrar producto
const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
  );

  res.json(product);
};

module.exports = {
  createProduct,
  findProducts,
  findProduct,
  updateProduct,
  deleteProduct,
};

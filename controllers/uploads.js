const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { uploadFile } = require("../helpers");

const { User, Product } = require("../models");

const fileUpload = async (req, res = response) => {
  try {
    // const pathFull = await uploadFile(req.files.file,['txt','md'], 'textos');
    const pathFull = await uploadFile(req.files.file, undefined, "imgs");

    res.json({
      path: pathFull,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

const updateImage = async (req, res) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  //limpiar imagenes previas
  if (model.img) {
    //hay que borrar la imagen en el servidor
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const nameFile = await uploadFile(req.files.file, undefined, collection);
  model.img = nameFile;

  await model.save();

  res.json(model);
};

const showFiles = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  if (model.img) {
    // Si la imagen existe, la mostramos
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathPlaceholder);
};

module.exports = {
  fileUpload,
  updateImage,
  showFiles,
};

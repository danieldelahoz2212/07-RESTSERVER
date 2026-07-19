const { response } = require("express");
const { uploadFile } = require("../helpers");



const fileUpload = async(req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json("No hay archivos para subir.");
  }

  try {
    // const pathFull = await uploadFile(req.files.file,['txt','md'], 'textos');
    const pathFull = await uploadFile(req.files.file, undefined, 'imgs');

    res.json({
        path: pathFull,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

module.exports = {
  fileUpload,
};

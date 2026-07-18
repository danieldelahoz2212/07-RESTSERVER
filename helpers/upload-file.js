const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  file,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  folder = '',
) => {
  return new Promise((resolve, reject) => {
    const cutName = file.name.split(".");
    const extension = cutName[cutName.length - 1];

    // Validar la extensión
    if (!extensionesValidas.includes(extension)) {
      return reject(new Error(
        `La extensión ${extension} no es válida. Las extensiones permitidas son: ${extensionesValidas.join(", ")}`
      ));
    }

    const uniqueName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, "../uploads", folder, uniqueName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(uploadPath);
    });
  });
};

module.exports = {
  uploadFile,
};
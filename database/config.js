const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_CNN);

    console.log("Base de datos online");

  } catch (error) {
    console.error("Error connecting to the database", error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = { dbConnection };

// db.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB conectada');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
    process.exit(1); // Detener la aplicación
  }
};

module.exports = conectarDB;

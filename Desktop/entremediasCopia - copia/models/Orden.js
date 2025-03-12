const mongoose = require('mongoose');

const OrdenInputSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto', // Referencia al modelo Producto
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
});

const OrdenSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  calle: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  localidad: {
    type: String,
    required: true
  },
  provincia: {
    type: String,
    required: true
  },
  codigoPostal: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  productos: [OrdenInputSchema], // Lista de productos incluidos en la orden
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orden', OrdenSchema);

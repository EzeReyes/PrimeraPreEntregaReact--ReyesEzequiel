const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Asegurarse de que no haya categorías duplicadas
    },
    descripcion: {
        type: String,
        trim: true,
    },
    imagen: {
        type: String,
        required: true,
        trim: true,
    },
    productos: [
        {
          type: mongoose.Schema.Types.ObjectId, // Referencia a documentos de "Producto"
          ref: 'Producto', // Nombre del modelo referenciado
        },
      ],
    creado: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);

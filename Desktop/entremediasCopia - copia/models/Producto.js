const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo de Categoría
        ref: 'Categoria',
        required: true, // Ahora se requiere que el producto esté asociado a una categoría
    },
    imagen: [
        {
        type: String,
        required: true,
        trim: true,
    }
],
    stock: {
        type: Number,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
    creado: {
        type: Date,
        default: Date.now(),
    },
});


    
// Método para actualizar el stock
ProductosSchema.methods.reducirStock = function(cantidad) {
    // Validar que haya suficiente stock disponible
    if (this.stock >= cantidad) {
        this.stock -= cantidad;
        return this.save(); // Guarda el producto actualizado
    } else {
        throw new Error('Stock insuficiente');
    }
};

ProductosSchema.virtual('id').get(function () {
    return this._id.toHexString(); // Convertir ObjectId a String
  });
  
  ProductosSchema.set('toJSON', {
    virtuals: true,
  });

module.exports = mongoose.model('Producto', ProductosSchema);




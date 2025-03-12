const mongoose = require('mongoose');

const CarritoItemSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
});

const CarritoSchema = new mongoose.Schema({
    items: [CarritoItemSchema],
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente', // Referencia al modelo Cliente
        required: true 
    },
    activo: {
            type: Boolean,
            default: false,
        }
});


const Carrito = mongoose.model('Carrito', CarritoSchema);

module.exports = Carrito;

const mongoose = require('mongoose');

const ClientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    domicilio: {
        type: String,
        required: true,
        trim: true,
    },
    localidad: {
        type: String,
        required: true,
        trim: true,
    },
    codigopostal: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    provincia: {
        type: String,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
});

const Cliente = mongoose.model('Cliente', ClientesSchema);

module.exports = Cliente;
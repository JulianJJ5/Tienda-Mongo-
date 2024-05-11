const mongoose = require('mongoose');

const ventasSchema = new mongoose.Schema({
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Clientes'},
    idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'Producto' },
    fecha:{ type: Date, required: true},
    valor: { type: Number, default: 0 },
    descuento: { type: Number, default: 0},
    estado: {type: Number, required: true, default: 1}
}, { timestamps: true })
 
module.exports= mongoose.model("Venta", ventasSchema)
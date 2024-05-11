const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    usuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario'   },
    nombre: { type: String, required: true ,max:42,unique:true},
    precio: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    stockminimo:{type:Number, default:0},
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true })


module.exports= mongoose.model("Producto", productoSchema)






// const mongoose = require('mongoose');

// const productoSchema = new mongoose.Schema({
//     usuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario'   },
//     nombre: { type: String, required: true ,max:42,unique:true},
//     precio: { type: Number, default: 0 },
//     cantidad: { type: Number, default: 0 },
//     stockminimo:{type:Number, default:0},
//     estado: { type: Number, required: true, default: 1 },
//     ventas:[
//         {
//             idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'Producto' },
//             cantidad:{type:Number,default:0},
//             fecha: {type: Date, required: true},
//             valor: {type: Number, default: 0},
//             descuento: {type: Number, default: 0}
//         }
//     ]
// }, { timestamps: true })


// module.exports= mongoose.model("Producto", productoSchema)
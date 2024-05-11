const Productos = require('./../models/producto')
const Usuarios = require('./../models/usuario')
const productosHelper = {
    productosID: async (id , req )=>{
        const existe= await Productos.findById(id)
if(!existe){
    throw new Error(`El id del producto no existe`)
}

    },

    idusuario: async (idusuario, req)=>{
        const existe= await Usuarios.findById(idusuario)
        if(!existe){
           throw new Error('El id de el cliente no existe')
        }

},

    nombre_producto: async (nombre, req) => {
        const existe = await Productos.findOne({ nombre: nombre });
        if (existe) {
            throw new Error(`El producto "${nombre}" ya existe`);
        }
       
    }
    }
    
module.exports = { productosHelper }
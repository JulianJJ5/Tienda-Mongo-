const Carrito=require('./../models/carrito')
const carritoHelper={
  clienteID:async (idcliente, req)=>{
      const existe= await Carrito.findById(idcliente)
      if(existe){
          throw new Error('El id del cliente ya existe')
      }
      
  },
  productoid: async (idproducto, req)=>{
      const existe= await Carrito.findById(idproducto)
      if(existe){
          throw new Error('El id del producto ya existe')
      }
  }
}

module.exports={carritoHelper}
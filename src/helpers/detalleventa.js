
const DetalleVenta=require('./../models/detalleventa')

const detalleHelper={
    detalleid:async (id, req)=>{
        const existe= await DetalleVenta.findById(id)
        if(!existe){
            throw new Error(`El registro no existe`)
        }
    }
}
module.exports={ detalleHelper}
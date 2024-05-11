const Ventas=require('./../models/ventas')
const ventasHelper={
    existeventaID: async (id ,req)=>{
        const existe=await Ventas.find(id)
    if(!existe){
        throw new Error(`El registro no existe ${id}`)
    }
    },
    existeidcliente:async (idcliente, req)=>{
            const existe=await Ventas.findOne({idcliente})
        if(!existe){
            throw new Error(`El cliente no existe `)
        }
    },
    verificarfecha:async (fecha , req,)=>{

    const fechaactual=new Date()
        const verificar= await Ventas.findOne({fecha:fechaactual})
        if(verificar){
            throw new Error(`La fecha no es valida ${fecha}`)
        }
     
    }
    }   
module.exports={ventasHelper}

const Cliente = require('./../models/clientes')


const clienteHelper = { 
    existeemail: async (email, req) => {
        const existencia = await Cliente.find({ email });
        if (existencia.length > 0) {
            throw new Error('El email ya existe');
        }
    },
    existedocumento: async (documento, req) => {
        const existencia = await Cliente.find({ documento });
        if (existencia.length > 0) {
            throw new Error('El documento ya existe');
        }
    },
    clienteID: async (id, req) => {
        const existe = await Cliente.findById(id);
        if (!existe) {
            throw new Error('El registro no existe');
        }
       
    }
}

module.exports={clienteHelper}
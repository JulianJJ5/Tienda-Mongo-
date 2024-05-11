const Carrito = require('../models/carrito');

const httpCarrito = {
    listarCarritoPorCliente: async (req, res) => {
        try {
            const carrito = await Carrito.find({ idcliente: req.params.id });
            res.json(carrito);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
 
    insertarItemCarrito: async (req, res) => {
        const carrito = new Carrito({
            idproducto: req.body.idproducto,
            idcliente: req.body.idcliente,
            cantidad: req.body.cantidad,
            precio: req.body.precio
        });

        try {
            const nuevoItemCarrito = await carrito.save();
            res.status(201).json(nuevoItemCarrito);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    eliminarCarrito: async (req, res) => {
        try {
            const carritoId = req.params.id;
            const deletedCarrito = await Carrito.findByIdAndDelete(carritoId);
            
            if (!deletedCarrito) {
                return res.status(404).json({ message: "El carrito no se encontró" });
            }
            
            return res.json({ message: "El carrito fue eliminado correctamente" });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
};

module.exports = { httpCarrito };

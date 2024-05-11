const Producto = require('./../models/producto');
const Usuario = require("../models/usuario");

const httpProducto = {
    listarTodo: async (req, res) => {
        try {
            const productos = await Producto.find();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarPorId: async (req, res) => {
        try {
            const producto = await Producto.findById(req.params.id);
            res.json(producto);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    listarPorStockMinimo: async (req, res) => {
        try {
            const productos = await Producto.find();
            const productosPorStockMinimo = productos.filter(producto => producto.cantidad <= producto.stockminimo);
            if (productosPorStockMinimo.length > 0) {
                res.json(productosPorStockMinimo);
            } else {
                res.status(404).json({ msg: 'No hay productos por debajo del stock mínimo.' });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    


    listarPorEncimaDelPrecioX: async (req, res) => {
        try {
            const precioX = req.params.precio;
            const productos = await Producto.find({ precio: { $gte: precioX } });
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    

    listarActivos: async (req, res) => {
        try {
            const productos = await Producto.find({ estado: 1 });
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarInactivos: async (req, res) => {
        try {
            const productos = await Producto.find({ estado: 0 });
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    insertarProducto: async (req, res) => {
        const producto = new Producto({
            usuario: req.body.usuario,
            nombre: req.body.nombre,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            stockminimo: req.body.stockminimo,
        });

        try {
            const usuario = await Usuario.findById(req.body.usuario)
            if(usuario){
            const nuevoProducto = await producto.save();
            res.status(201).json(nuevoProducto);
        }} catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    

    modificarProducto: async (req, res) => {
        try {
            const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(producto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    activarProducto: async (req, res) => {
        try {
            const producto = await Producto.findByIdAndUpdate(req.params.id, { estado: 1 }, { new: true });
            res.json('El producto fué desactivado correctamente');
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    desactivarProducto: async (req, res) => {
        try {
            const producto = await Producto.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });
            res.json('El producto fué desactivado correctamente');
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = { httpProducto };

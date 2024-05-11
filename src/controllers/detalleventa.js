const DetalleVenta = require('./../models/detalleventa');

const httpDetalleVenta = {
    listarVentaPorId: async (req, res) => {
        try {
            const detalleVentas = await DetalleVenta.find({ venta: req.params.id });
            res.json(detalleVentas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    insertarDetalleVenta: async (req, res) => {
        const detalleVenta = new DetalleVenta({
            venta: req.body.venta,
            producto: req.body.producto,
            valor: req.body.valor,
            cantidad: req.body.cantidad
        });

        try {
            const nuevoDetalleVenta = await detalleVenta.save();
            res.status(201).json(nuevoDetalleVenta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    modificarDetalleVenta: async (req, res) => {
        try {
            const detalleVenta = await DetalleVenta.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(detalleVenta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = { httpDetalleVenta };

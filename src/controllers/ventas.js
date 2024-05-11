const Venta = require('./../models/ventas');

const httpVentas = {
    listarTodo: async (req, res) => {
        try {
            const ventas = await Venta.find();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarPorId: async (req, res) => {
        try {
            const venta = await Venta.findById(req.params.id);
            res.json(venta);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    
    listarActivos: async (req, res) => {
        try {
            const ventasActivas = await Venta.find({ estado: 1 });
            res.json(ventasActivas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarInactivos: async (req, res) => {
        try {
            const ventasInactivas = await Venta.find({ estado: 0 });
            res.json(ventasInactivas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarVentasDelCliente: async (req, res) => {
        try {
            const ventasDelCliente = await Venta.find({ cliente: req.params.cliente });
            res.json(ventasDelCliente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    listarVentasEntreFechas: async (req, res) => {
        const { fechaInicio, fechaFin } = req.body;
        try {
            const ventasEntreFechas = await Venta.find({ fecha: { $gte: fechaInicio, $lte: fechaFin } });
            res.json(ventasEntreFechas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    listarVentasMayoresAX: async (req, res) => {
        const { precio } = req.body;
        try {
            const ventasMayoresAX = await Venta.find({ valor: { $gt: precio } });
            res.json(ventasMayoresAX);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    calcularTotalDescuento: async (req, res) => {
        try {
            const ventas = await Venta.find();
            let totalDescuento = 0;
            ventas.forEach(venta => {
                totalDescuento += venta.descuento;
            });
            res.json({ totalDescuento });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    insertarVenta: async (req, res) => {
        const venta = new Venta({
            cliente: req.body.cliente,
            idproducto: req.body.idproducto,
            fecha: req.body.fecha,
            valor: req.body.valor,
            descuento: req.body.descuento
        });

        try {
            const nuevaVenta = await venta.save();
            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    modificarVenta: async (req, res) => {
        const { id } = req.params 
        const {  cliente, idproducto, fecha, valor, descuento } = req.body
        try {
            const venta = await Venta.findById(id)
            if (venta) {
                venta.idproducto=idproducto
                venta.cliente=cliente
                venta.fecha = fecha
                venta.valor = valor
                venta.descuento = descuento
                await venta.save()
                res.json({ msg: 'venta modificada' })
            } else {
                res.status(404).json({ msg: 'no se modificó la venta' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },



    activarVenta: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, { estado: 1 }, { new: true });
            res.json(venta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    desactivarVenta: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, { estado: 0 }, { new: true });
            res.json(venta);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = { httpVentas };

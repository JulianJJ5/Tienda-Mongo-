const Cliente = require("../models/clientes");

const httpClientes = {
  // listar todo
  listarTodo: async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarPorId: async (req, res) => {
    try {
      const cliente = await Cliente.findById(req.params.id);
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarActivos: async (req, res) => {
    try {
      const clientes = await Cliente.find({ estado: 1 });
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarInactivos: async (req, res) => {
    try {
      const clientes = await Cliente.find({ estado: 0 });
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  insertarCliente: async (req, res) => {
    const cliente = new Cliente({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      email: req.body.email,
      documento: req.body.documento,
      fecha_compra: req.body.fecha_compra,
    });

    try {
      const nuevoCliente = await cliente.save();
      res.status(500).json('Cliente guardado correctamente');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  modificarCliente: async (req, res) => {
    try {
      const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json('Cliente modificado correctamente');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }, 

  activarCliente: async (req, res) => {
    try {
      const cliente = await Cliente.findByIdAndUpdate(
        req.params.id,
        { estado: 1 },
        { new: true }
      );
      res.json('Cliente activado correctamente');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  desactivarCliente: async (req, res) => {
    try {
      const cliente = await Cliente.findByIdAndUpdate(
        req.params.id,
        { estado: 0 },
        { new: true }
      );
      res.json('El cliente fué desactivado correctamente');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = { httpClientes };

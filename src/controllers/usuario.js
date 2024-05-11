const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs")
const {generarJWT} = require ("../middlewares/validarJWT")

// Listar todos los usuarios
const httpUsuarios = {
  getUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json({ usuarios });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Listar un solo usuario por su ID
  getUsuarioXId: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        res.json({ usuario });
      } else {
        res.status(400).json({ msg: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Listar Usuarios activos
  getUsuariosActivos: async (req, res) => {
    const { estado } = req.params;
    try {
      const usuariosActivos = await Usuario.find({ estado: 1 });
      res.json({ usuariosActivos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Listar Usuarios inactivos
  getUsuariosInactivos: async (req, res) => {
    try {
      const usuariosInactivos = await Usuario.find({ estado: 0 });
      res.json({ usuariosInactivos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Insertar Usuarios (post)
  postinsertarUsuario: async (req, res) => {
          
    const { email, password } = req.body;
    const usuario = new Usuario({ email,password});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        usuario
    })
},

  // Login de usuarios (post)
  // postLoginUsuario: async (req, res) => {
  //   const { email, password } = req.body;
  //   const usuario = await Usuario.find({ email, password });
  //   if (usuario) {
  //     if (usuario.estado == 1) {res.json({ usuario })}
  //     else res.status(401).json({ msg: "Usuario Inactivo" });
  //   } else {
  //     res.status(401).json({ msg: "Usuario no existe" });
  //   }
  // },

  postLoginUsuario: async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuario.findOne({ email })
        if (!user) {
            return res.status(401).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        // if (user.estado === 0) {
        //     return res.status(401).json({
        //         msg: "Usuario / Password no son correctos"
        //     })
        // }

        /////////pago o no pago    xxxxxxxx

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        const token = await generarJWT(user._id);

        res.json({
            usuario: user,
            token
        })

    } catch (error) {

        return res.status(500).json({


            msg: "Hable con el WebMaster"
        })
    }
},

  // Cambiar contraseña (post)
  postcambiarContraseña: async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    try {
        const usuario = await Usuario.findById(id)

        if (!usuario) {
            res.status(400).json({ mgs: 'usuario no encontrado' })
        }
        const salt=bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);
        usuario.password = hashedPassword
        await usuario.save()

        res.json({ mgs: ' contraseña cambiada correctamente' })


    } catch (error) {
        res.status(400).json({ error })
    }
},

  // Modificar usuario (put)
  putmodificarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await Usuario.findByIdAndUpdate(id, req.body);
      res.json({ msg: "Usuario modificado correctamente" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Activar usuario
  putactivarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await Usuario.findByIdAndUpdate(id, { activo: true });
      res.json({ msg: "Usuario activado correctamente" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Desactivar usuario
  putdesactivarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await Usuario.findByIdAndUpdate(id, { activo: false });
      res.json({ msg: "Usuario desactivado correctamente" });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  eliminarUsuario: async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}};

module.exports = { httpUsuarios };

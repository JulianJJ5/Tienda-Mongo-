const {Router} = require('express')
const { httpUsuarios } = require('../controllers/usuario')
const { check } = require('express-validator')
const { usuarioHelper } = require('./../helpers/usuario')
const {validarCampos } = require('./../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router()

router.get('/listartodo',[validarJWT, validarCampos], httpUsuarios.getUsuarios)
router.get('/listar/:id',[validarJWT,
    check('id', 'el id no es valida').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.getUsuarioXId)

router.get('/listaractivos',[validarJWT, validarCampos], httpUsuarios.getUsuariosActivos)
router.get('/listarinactivos',[validarJWT, validarCampos], httpUsuarios.getUsuariosInactivos)


router.post('/insertar',[
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    check('email').custom(usuarioHelper.existeEmail),
    check('password', 'Password no es válido').isLength({ min: 8 }),
    validarCampos
], httpUsuarios.postinsertarUsuario)
router.post('/login',[validarCampos], httpUsuarios.postLoginUsuario)
router.post('/cambiarcontrasena/:id',[
    check('id', 'el id no es valida').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarJWT, validarCampos
], httpUsuarios.postcambiarContraseña)


router.put('/modificar/:id',[
    check('id', 'el id no es valida').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    validarJWT, validarCampos
], httpUsuarios.putmodificarUsuario)
router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarJWT, validarCampos
], httpUsuarios.putactivarUsuario)
router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarJWT, validarCampos
], httpUsuarios.putdesactivarUsuario)
router.delete('/eliminar/:id', httpUsuarios.eliminarUsuario)

module.exports = router

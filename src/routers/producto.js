const {Router} = require('express');
const { httpProducto } = require('./../controllers/producto');
const {check}=require('express-validator')
const {validarCampos}=require('./../middlewares/validar-campos')
const { productosHelper } = require('./../helpers/producto')

const router = Router()

router.get('/listartodo', httpProducto.listarTodo)
router.get('/listar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosID),
    validarCampos
], httpProducto.listarPorId)
router.get('/listarporstockminimo', httpProducto.listarPorStockMinimo)
router.get('/listarporencimadelpreciox/:precio', httpProducto.listarPorEncimaDelPrecioX)
router.get('/listaractivos', httpProducto.listarActivos)
router.get('/listarinactivos', httpProducto.listarInactivos)


router.post('/insertar',[
    check('usuario','el id del usuario no es válido').isMongoId(),
    check('usuario').custom(productosHelper.idusuario),
    check('nombre','El campo nombre no esta registrado').notEmpty(),
    check('nombre','El campo nombre debe tener máximo 40 caracteres').isLength({max:40}),
    check('nombre','ya existe el nombre del producto').custom(productosHelper.nombre_producto),
    validarCampos
], httpProducto.insertarProducto)


router.put('/modificar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosID),
    check('nombre','El campo nombre no esta registrado').notEmpty(),
    check('nombre','El campo nombre debe tener máximo 40 caracteres').isLength({max:40}),
    check('nombre','ya existe el nombre del producto').custom(productosHelper.nombre_producto),
    validarCampos
], httpProducto.modificarProducto)

router.put('/activar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosID),
    validarCampos
], httpProducto.activarProducto)

router.put('/desactivar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosID),
    validarCampos
], httpProducto.desactivarProducto)


module.exports = router
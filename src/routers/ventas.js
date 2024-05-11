const {Router} = require('express');
const { httpVentas } = require('../controllers/ventas');
const { validarCampos } = require('./../middlewares/validar-campos');
const {check} = require('express-validator');
const router = Router()
const { ventasHelper } = require('./../helpers/ventas');

router.get('/listartodo', httpVentas.listarTodo)
router.get('/listar/:id',[
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelper.existeventaID),
    validarCampos
], httpVentas.listarPorId)
router.get('/listaractivos', httpVentas.listarActivos)
router.get('/listarinactivos', httpVentas.listarInactivos)
router.get('/listarventasdelcliente/:cliente',[
    check('cliente','el id no es valido').isMongoId(),
    check('id').custom(ventasHelper.existeventaID),
    validarCampos
], httpVentas.listarVentasDelCliente)
router.get('/listarventasentrefechas', httpVentas.listarVentasEntreFechas)
router.get('/listarventasmayoresax', httpVentas.listarVentasMayoresAX)
router.get('/totaldescuento', httpVentas.calcularTotalDescuento)

router.post('/insertar',[
    check('fecha','la fecha no esta regisrada').notEmpty(),
    check('fecha').custom(ventasHelper.verificarfecha),
    validarCampos
], httpVentas.insertarVenta)

router.put('/modificar/:id',[
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelper.existeventaID),
validarCampos
], httpVentas.modificarVenta)
router.put('/activar/:id',[
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelper.existeventaID),
validarCampos
], httpVentas.activarVenta)
router.put('/desactivar/:id',[
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelper.existeventaID),
validarCampos
], httpVentas.desactivarVenta)

module.exports = router
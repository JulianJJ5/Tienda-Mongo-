const {Router} = require('express');
const { httpDetalleVenta } = require('./../controllers/detalleventa');
const {check}=require('express-validator')
const {validarCampos}=require('./../middlewares/validar-campos')
const { detalleHelper } = require('./../helpers/detalleventa');
const router = Router()

router.get('/listarventa/:id',[
    check('id',"El id no es valido").isMongoId(),
    check('id').custom(detalleHelper.detalleid),
validarCampos], httpDetalleVenta.listarVentaPorId)

router.post('/insertar', httpDetalleVenta.insertarDetalleVenta)

router.put('/modificar/:id',[
    check('id',"El id no es valido").isMongoId(),
    check('id').custom(detalleHelper.detalleid),
    validarCampos], httpDetalleVenta.modificarDetalleVenta)
module.exports = router
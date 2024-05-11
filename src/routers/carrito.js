const {Router} = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('./../middlewares/validar-campos');
const { carritoHelper } = require('./../helpers/carrito');
const { httpCarrito } = require('./../controllers/carrito');
const router = Router()

router.get('/listarcarritox/:id', [
    check('idcliente',' El id de el cliente no es valido').isMongoId(),
    check('idcliente').custom(carritoHelper.clienteID),
    validarCampos
    ], httpCarrito.listarCarritoPorCliente)

router.post('/insertar',[
    check('idcliente',' El id de el cliente no es valido').isMongoId(),
    check('idcliente').custom(carritoHelper.clienteID),
    check('idproducto','El id del producto no es valido').isMongoId(),
    check('idproducto').custom(carritoHelper.productoid),
    check('cantidad',' El campo cantidad es obligatorio').notEmpty(),
    check('precio','El campo precio es obligatorio').notEmpty(),

    validarCampos
], httpCarrito.insertarItemCarrito)

router.delete('/eliminar/:id', httpCarrito.eliminarCarrito)

module.exports = router
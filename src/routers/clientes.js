const {Router} = require('express');
const { httpClientes } = require('../controllers/clientes');
const {check} = require('express-validator');
const {validarCampos}=require('./../middlewares/validar-campos')
const { clienteHelper } = require('./../helpers/clientes')
const router = Router()

router.get('/listartodo', httpClientes.listarTodo)
router.get('/listar/:id', httpClientes.listarPorId)
router.get('/listaractivos', httpClientes.listarActivos)
router.get('/listarinactivos', httpClientes.listarInactivos)

router.post('/insertar',[
    check('nombre','el campo nombre es obligatorio').notEmpty(),
    check('direccion','El campo  direccion es obligatorio').notEmpty(),
    check('direccion','El campo direccion debe tener maximo 50 caracteres').isLength({max:50}),
    check('telefono',' El campo telefono es obligatorio').notEmpty(),
    check('email','El campo email es obligatorio').notEmpty(),
    check('email').custom(clienteHelper.existeemail),
    check('documento','El campo documento es obligatorio').notEmpty(),
    check('documento',).custom(clienteHelper.existedocumento),
    check('fecha_compra',' El campo fecha es obligatorio').notEmpty(),
    validarCampos

], httpClientes.insertarCliente)

router.put('/modificar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id',).custom(clienteHelper.clienteID),
    check('direccion','El campo direccion debe tener maximo 50 caracteres').isLength({max:50}),
   validarCampos 
], httpClientes.modificarCliente)
router.put('/activar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id',).custom(clienteHelper.clienteID),
    validarCampos
], httpClientes.activarCliente)
router.put('/desactivar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id',).custom(clienteHelper.clienteID),
    validarCampos
], httpClientes.desactivarCliente)


module.exports = router


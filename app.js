const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 
require('dotenv').config()

const usuarios=require('./src/routers/usuario')
const carrito = require('./src/routers/carrito')
const clientes = require('./src/routers/clientes')
const detalleventa = require('./src/routers/detalleventa')
const ventas = require('./src/routers/ventas')
const producto = require('./src/routers/producto')

const app= express()

app.use(cors())
app.use(express.json())
app.use('/api/carrito', carrito)
app.use('/api/cliente', clientes)
app.use('/api/detalleventa', detalleventa)
app.use('/api/producto', producto)
app.use('/api/usuario', usuarios)
app.use('/api/ventas', ventas)


app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected!')); 
});
const express = require('express');
const app = express();
const PORT = 8080;
const productsRouter = require("./Routes/products.router.js");
const cartsRouter = require("./Routes/carts.router.js");
const viewsRouter = require('./Routes/views.router.js');
const Server = require('socket.io');
const httpServer = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));
const socketServer = Server(httpServer);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use(express.static(__dirname + '/../public'));

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('message', data => console.log(data));
    socket.emit('individual', 'Este es un mensaje del servidor mostrandose en la consola del navegador');
});
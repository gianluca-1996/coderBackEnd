const express = require('express');
const app = express();
const PORT = 8080;
const productsRouter = require("./Routes/products.router.js");
const cartsRouter = require("./Routes/carts.router.js");
const viewsRouter = require('./Routes/views.router.js');
const Server = require('socket.io');
const httpServer = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto: ${PORT}`));
const socketServer = Server(httpServer);
const ProductManager = require("./Classes/productManager.js");
const productMngr = new ProductManager('./productos.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use(express.static(__dirname + '/public'));

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    productMngr.getProducts()
    .then((productos) => {
        socket.emit('productos', productos);
    })

    socket.on('nuevoProducto', producto => {
        productMngr.addProduct(producto.code, producto.title, producto.description, producto.price, [], producto.stock)
        .then(() => {
            productMngr.getProducts()
            .then((productos) => {
                socket.emit('productos', productos);
                socket.emit('respuestaAdd', "Producto agregado");
            })            
        })
        .catch((error) => socket.emit('respuestaAdd', "Error al agregar el producto: " + error.message))
    });
    
    socket.on('eliminarProducto', pid => {
        productMngr.deleteProduct(pid)
        .then(() => {
            productMngr.getProducts()
            .then((productos) => {
                socket.emit('productos', productos);
                socket.emit('respuestaDelete', "Producto eliminado");
            })            
        })
        .catch((error) => socket.emit('respuestaDelete', "Error al eliminar el producto: " + error.message))
    })
})
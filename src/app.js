const ProductManager = require("./Classes/ProductManager");
const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));
const productMngr = new ProductManager("./productos.json");

//DESAFIO NUMERO 3 (SERVIDORES WEB)
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit)){
        obtenerProductos(limit)
        .then(productos => res.json(productos))
        .catch(error => console.log(error))
    }
    else res.send("ERROR: Limit is not a number");
})

app.get('/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    if(!isNaN(pid)){
        obtenerProductoId(pid)
        .then(producto => res.json(producto))
        .catch(error => console.log(error))
    }
    else res.send("ERROR: pid is not a number")
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
})


const obtenerProductos = async limit => {
    try {
        let productos = await productMngr.getProducts();
        const productosFiltrados = new Array();

        if(limit){
            for (let index = 0; index < limit; index++) {
                productos[index] && productosFiltrados.push(productos[index]);
            }
            productos = productosFiltrados;
        }
        
        return productos;
    } catch (error) {
        console.log("ERROR: " + error);
    }
}

const obtenerProductoId = async pid => {
    try {
        const producto = await productMngr.getProductById(pid);
        return producto;
    } catch (error) {
        console.log(error);
    }
}
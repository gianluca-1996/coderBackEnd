const ProductManager = require("./Classes/ProductManager");
const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));
const productMngr = new ProductManager("./productos.json");

//DESAFIO NRO 1
/*const productMngr = new ProductManager();
productMngr.addProduct("P.nap", "Pizza napoletana", "Masa madre, salsa de tomate natural, rodajas de tomate, ajo, oregano, aceitunas", 8000, "urlImage", 10);
productMngr.addProduct("P.moz", "Pizza mozzarella", "Masa madre, salsa de tomate natural, mozzarella italiana", 7000, "urlImage", 10);
productMngr.addProduct("P.4q", "Pizza 4 quesos", "Masa madre, salsa de tomate natural, mozzarella italiana, parmesano, roquefort, reggianito", 9000, "urlImage", 10);
productMngr.addProduct("P.jym", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron", 8000, "urlImage", 10);

console.log("---Errores---")
productMngr.addProduct("P.moz", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron", 8000, "urlImage");
productMngr.addProduct("P.moz", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron", 8000);
productMngr.addProduct("P.moz", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron");
productMngr.addProduct("P.moz", "Pizza jamon y morrones");
productMngr.addProduct("P.moz");
productMngr.addProduct("P.jym", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron", 0, "urlImage", 10);
productMngr.addProduct("P.jym", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron", 8000, "urlImage", 0);
productMngr.addProduct("P.jym", "Pizza jamon y morrones", "Masa madre, salsa de tomate natural, mozzarella italiana, jamon, morron", "price", "urlImage", 10);

console.log("---getProducts()---")
productMngr.getProducts();

console.log("---getProductById(3)---")
productMngr.getProductById(3);

console.log("---getProductById(0) con error---")
productMngr.getProductById(0);
*/

// DESAFIO NUMERO 2
/*
const iniciar = async () => {

    try {
        const productMngr = new ProductManager("./productos.json");
        
        console.log("------------------addProduct()------------------");
        await productMngr.addProduct("P.nap", "Pizza napoletana", "Masa madre, salsa de tomate natural, rodajas de tomate, ajo, oregano, aceitunas", 8000, "urlImage", 10);
        await productMngr.addProduct("P.moz", "Pizza mozzarella", "Masa madre, salsa de tomate natural, mozzarella italiana", 7000, "urlImage", 10);
        await productMngr.addProduct("P.4q", "Pizza 4 quesos", "Masa madre, salsa de tomate natural, mozzarella italiana, parmesano, roquefort, reggianito", 9000, "urlImage", 10);

        console.log("------------------addProduct() con ERROR------------------");
        await productMngr.addProduct("P.4q", "Pizza 4 quesos", "Masa madre, salsa de tomate natural, mozzarella italiana, parmesano, roquefort, reggianito", 9000, "urlImage");
        
        console.log("------------------getProducts()------------------");
        const productos = await productMngr.getProducts();
        productos.forEach(element => {
            console.log(element);
        });

        console.log("------------------getProductById()------------------");
        let producto = await productMngr.getProductById(2);
        console.log(producto);

        console.log("------------------getProductById() con ERROR------------------");
        producto = await productMngr.getProductById(0);
        console.log(producto);

        console.log("------------------updateProduct() con objeto entero------------------");
        await productMngr.updateProduct(2, {
            title: 'pizza Actualizada obj entero',
            description: 'Masa madre, salsa de tomate natural, rodajas de tomate, ajo, oregano, aceitunas',
            price: 8000,
            thumbnail: 'urlImage',
            code: 'P.nap',
            stock: 10 
        });
        producto = await productMngr.getProductById(2);
        console.log(producto);

        console.log("------------------updateProduct() especificando un campo------------------");
        await productMngr.updateProduct(2, null, "title", 'titulo pizza Actualizada');
        producto = await productMngr.getProductById(2);
        console.log(producto);

        console.log("------------------deleteProduct()------------------");
        //await productMngr.deleteProduct(2);
        //await productMngr.getProductById(2);

        console.log("------------------deleteProduct() con ERROR------------------");
        await productMngr.deleteProduct(0);
        await productMngr.getProductById(0);
        

    } catch (error) {
        console.log(error.message);
    }
}

iniciar();
*/

//DESAFIO NUMERO 3 (SERVIDORES WEB)
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    obtenerProductos(limit)
    .then(productos => res.json(productos))
    .catch(error => console.log(error))
})

app.get('/producto/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    obtenerProductoId(pid)
    .then(producto => res.json(producto))
    .catch(error => console.log(error))
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
const Router = require("express")
const router = Router();
const ProductManager = require("./../Classes/ProductManager.js");
const productMngr = new ProductManager("./productos.json");


router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit)){
        obtenerProductos(limit)
        .then(productos => res.json(productos))
        .catch(() => res.send("Error al obtener los productos"))
    }
    else res.status(400).send("Error: limit is not a number")
})

router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    if(!isNaN(pid)){
        obtenerProductoId(pid)
        .then(producto => res.json(producto))
        .catch(error => console.log(error))
    }
    else res.send("ERROR: pid is not a number")
})

router.post('/', (req, res) => {
    agregar(req.body.code, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.stock, req.body.category)
    .then(() => {
        res.send("Producto agregado con exito...");
    })
    .catch(error => res.send(error.message))
})

router.put('/:pid', (req, res) => {
    actualizar(req.params.pid, req.body.obj, req.body.campo, req.body.valor)
    .then(() => res.send("Producto actualizado con exito..."))
    .catch(error => res.send(error.message))
})

router.delete('/:pid', (req, res) => {
    eliminar(req.params.pid)
    .then(() => {
        res.send("Producto eliminado con exito...");
    })
    .catch(error => res.send(error.message))
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

const agregar = async (code, title, description, price, thumbnail, stock, category) => {
    await productMngr.addProduct(code, title, description, price, thumbnail, stock, category);
}

const actualizar = async (pid, obj, campo, valor) => {
    await productMngr.updateProduct(pid, obj, campo, valor);
}

const eliminar = async (pid) => {
    await productMngr.deleteProduct(pid);
}

module.exports = router;
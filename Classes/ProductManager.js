const Producto = require("./Producto.js");

class ProductManager{
    #products

    constructor(){
        this.#products = []
    }

    addProduct(code, title, description, price, thumbnail, stock){
        let id;
        
        if(!code)    return console.log("Debe incluir el campo code");
        if(!title)   return console.log("Debe incluir el campo title");
        if(!description)   return console.log("Debe incluir el campo description");
        if(isNaN(price))    return console.log("Debe incluir el campo price");
        if(price < 1)   return console.log("El precio debe se mayor a 1");
        if(!thumbnail)   return console.log("Debe incluir el campo thumbnail");
        if(isNaN(stock))   return console.log("Debe incluir el campo stock");
        if(stock < 1)   return console.log("El stock debe se mayor a 1");

        id = (this.#products.length == 0) ? 1 : this.#products[this.#products.length - 1].id + 1
        this.#products.push(new Producto(id, title, description, price, thumbnail, code, stock));
        console.info(`Producto \"${title}\" creado con exito`);
    }

    getProducts(){
        this.#products.forEach(product => {console.log(product)});
    }

    getProductById(id){
        const result = this.#products.find(product => product.id == id);
        if(result)  console.log(result);
        else    console.log("Producto no encontrado");
    }
}

module.exports = ProductManager;
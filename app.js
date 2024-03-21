const ProductManager = require("./Classes/ProductManager");

const productMngr = new ProductManager();
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
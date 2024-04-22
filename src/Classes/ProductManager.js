const fs = require("fs");

class ProductManager {
  #path;

  constructor(path) {
    //this.#createFile(path);
    this.#path = path;
  }

  async #createFile(path) {
    try {
      await fs.promises.writeFile(path, JSON.stringify([]));
      console.log(`Archivo \'${path}\' creado con exito!`);
    } catch (error) {
      return console.log(`No se pudo crear el archivo con nombre: ${path}`);
    }
  }

  async addProduct(code, title, description, price, thumbnail, stock) {
    let id;

    if (!code) throw Error("Debe incluir el campo code");
    if (!title) throw Error("Debe incluir el campo title");
    if (!description) throw Error("Debe incluir el campo description");
    if (isNaN(price)) throw Error("Debe incluir el campo price");
    if (price < 1) throw Error("El precio debe se mayor a 1");
    if (isNaN(stock)) throw Error("Debe incluir el campo stock");
    if (stock < 1) throw Error("El stock debe se mayor a 1");

    try {
      const productos = await this.getProducts();

      id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
      productos.push(
        {id, title, description, price, thumbnail, code, stock, status: true}
      );

      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 3));
      console.info(`Producto \"${title}\" creado con exito`);
    } catch (error) {
      console.log(
        `No se pudo insertar el producto: ${title}. \nError: ${error.message}`
      );
    }
  }

  async getProducts() {
    let productos;
    if (fs.existsSync(this.#path)) productos = await fs.promises.readFile(this.#path);
    return JSON.parse(productos);
  }

  async getProductById(id) {
    const productos = await this.getProducts();
    const item = await productos.find((product) => product.id == id);
    return item ? item : "Producto no encontrado";
  }

  async updateProduct(id, obj, campo, valor) {
    const productos = await this.getProducts();
    const itemPosition = await productos.findIndex(
      (product) => product.id == id
    );

    if (itemPosition === -1) {
      throw new Error("No se encontro el producto para actualizar");
    }

    let objetoNuevo;

    switch (campo) {
      case "title":
        objetoNuevo = { ...productos[itemPosition], title: valor };
        productos[itemPosition] = objetoNuevo;
        break;

      case "description":
        objetoNuevo = { ...productos[itemPosition], description: valor };
        productos[itemPosition] = objetoNuevo;
        break;

      case "price":
        objetoNuevo = { ...productos[itemPosition], price: valor };
        productos[itemPosition] = objetoNuevo;
        break;

      case "thumbnail":
        objetoNuevo = { ...productos[itemPosition], thumbnail: valor };
        productos[itemPosition] = objetoNuevo;
        break;

      case "code":
        objetoNuevo = { ...productos[itemPosition], code: valor };
        productos[itemPosition] = objetoNuevo;
        break;

      case "stock":
        objetoNuevo = { ...productos[itemPosition], stock: valor };
        productos[itemPosition] = objetoNuevo;
        break;

      case undefined:
        productos[itemPosition] = { id: productos[itemPosition].id, ...obj };
        break;
    }

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 3));
    } catch (error) {
      console.log("ERROR: No se pudo actualizar el producto. ", error.message);
    }
  }

  async deleteProduct(id) {
    let productos = await this.getProducts();
    const itemPosition = await productos.findIndex(
      (product) => product.id == id
    );

    if (itemPosition === -1) {
      throw new Error("No se encontro el producto a eliminar");
    }

    productos = productos.filter(prod => prod.id != id);

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 3));
      console.log("Producto eliminado con exito");
    } catch (error) {
      console.log("ERROR: No se pudo eliminar el producto. ", error.message);
    }
  }
}

module.exports = ProductManager;

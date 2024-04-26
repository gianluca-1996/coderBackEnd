const Router = require("express");
const router = Router();
const handlebars = require("express-handlebars");
router.engine("handlebars", handlebars.engine());
router.set("views", __dirname + "/../views");
router.set("view engine", "handlebars");

const usuarios = [];



router.get("/usuarios", (req, res) => {
    res.render("usuarios", {usuarios, length: usuarios.length ? true : false});
});

router.post('/agregar', (req, res) => {
    const nombre = req.body.nombre
    const email = req.body.email
    const pass = req.body.pass
    usuarios.push({nombre, email})
    res.send("Usuario agregado con exito");
})

router.get('/', (req, res) => {
    res.render('index', {});
})

module.exports = router;

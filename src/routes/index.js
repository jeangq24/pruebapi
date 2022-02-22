const { Router } = require('express');

// Se Importan todos los routers;
const registrarUsuario = require("./registroUsuario.js");
const iniciarSesion = require("./loginUsuario.js");
const crearTarea = require("./crearTarea.js");
const tarea = require("./tarea.js");


const router = Router();

// Se Configuran los routers
router.use("/registrar", registrarUsuario);
router.use("/iniciarSesion", iniciarSesion);
router.use("/crearTarea", crearTarea);
router.use("/tarea", tarea);

module.exports = router;

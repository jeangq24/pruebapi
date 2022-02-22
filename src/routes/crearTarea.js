const Router = require("express");
const { Tarea } = require("../db.js");
const jwt = require("jsonwebtoken");
const verificacionToken = require("./verificacionToken.js");
const {SECRET_KEY}= process.env;
const router = Router();

// Edpoint http://127.0.0.1:3001/crearTarea
// Se crean nuevas tareas
router.post("/", verificacionToken, async(req,res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async(error, data) => {
            if(error) {
                return res.sendStatus(403);
            }else {
                const {titulo, descripcion,prioridad} = req.body;

                if(prioridad.toLowerCase()!=="alta" && prioridad.toLowerCase()!=="media" && prioridad.toLowerCase()!=="baja") {
                    return res.send({mensaje: " 'Prioridad' no es un valor correcto"});
                }else if (!titulo || !descripcion ) {
                    return res.send({mensaje: "El titulo o descripcion son necesarios"});
                }
    
                let fechaCreacion= new Date();
                let fechaModificacion= null;
                fechaCreacion= `${fechaCreacion.getDate()}/${fechaCreacion.getMonth()+1}/${fechaCreacion.getFullYear()}`;
                
                fechaModificacion=fechaCreacion;

                const tarea = await Tarea.create({
                    titulo,
                    descripcion,
                    prioridad: prioridad.toLowerCase(),
                    fechaCreacion,
                    fechaModificacion
                });

                res.send({mensaje: "la tarea se creo correctamente", data : tarea });
            }
        });
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

module.exports = router;
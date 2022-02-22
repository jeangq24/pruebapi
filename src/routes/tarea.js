const Router = require("express");
const { Tarea } = require("../db.js");
const jwt = require("jsonwebtoken");
const verificacionToken = require("./verificacionToken.js");
const { SECRET_KEY } = process.env;
const router = Router();

// Edpoint http://127.0.0.1:3001/tareas/todas o http://127.0.0.1:3001/tareas/todas?prioridad=media||baja||alta 
// Para obtener todas la tareas o tareas filtradas por prioridad
router.get("/todas", verificacionToken, async (req, res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (error, data) => {
            if(error){
                return res.sendStatus(403);
            };

            const { prioridad } = req.query
            if (prioridad) {
                if (prioridad.toLowerCase() !== "alta" && prioridad.toLowerCase() !== "media" && prioridad.toLowerCase() !== "baja") {
                    return res.send({ mensaje: "Query prioridad no posee valor correcto" });
                };

                const tareas = await Tarea.findAll({ where: { prioridad: prioridad.toLowerCase() } });
                return res.send({ mensaje: 200, data: tareas })

            } else {
                const tareas = await Tarea.findAll()
                return res.send({ mensaje: 200, data: tareas});
            }

        });
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});


//Edpoint http://127.0.0.1:3001/tareas/detalle
//Para visulizar una tarea en especial pasando ID por body
router.get("/detalle", verificacionToken, async (req, res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (error, data) => {
            if(error){
                return res.sendStatus(403);
            };

            const { id } = req.body
            if(typeof id !== 'number') {
                return res.send({mensaje: "ID no valido"});
            }

            const tarea = await Tarea.findAll({ where: {id}});
            return res.send({ mensaje: 200, data: tarea});

        });

    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

//Edpoint http://127.0.0.1:3001/tareas/eliminar
//Para eliminar una tarea pasando ID por body
router.delete("/eliminar", verificacionToken, async (req, res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (error, data) => {
            if(error){
                return res.sendStatus(403);
            };

            const { id } = req.body
            if(typeof id !== 'number') {
                return res.send({mensaje: "ID no valido"});
            }

            const tarea = await Tarea.destroy({ where: {id}});
            return res.send({ mensaje: "Tarea eliminada", data: tarea});

        });

    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

// Edpoint http://127.0.0.1:3001/tareas/editar
// Para editar titulo, descripcion o prioridad (completada) de una tarea
router.put("/editar", verificacionToken, async (req, res) => {
    try {
        jwt.verify(req.token, SECRET_KEY, async (error, data) => {
            if(error){
                return res.sendStatus(403);
            };

            const { id, titulo, descripcion, prioridad} = req.body;
            if(typeof id !== 'number') {
                return res.send({mensaje: "ID no valido"});
            }

            if (prioridad.toLowerCase() !== "alta" && prioridad.toLowerCase() !== "media" && prioridad.toLowerCase() !== "baja" && prioridad.toLowerCase() !== "completada") {
                return res.send({ mensaje: "prioridad no posee valor correcto (alta, media, baja, completada)" });
            };

            let fechaCreacion = new Date();
            fechaCreacion = `${fechaCreacion.getDate()}/${fechaCreacion.getMonth()+1}/${fechaCreacion.getFullYear()}`;
            const tarea = await Tarea.update({titulo, fechaModificacion: fechaCreacion, descripcion, prioridad: prioridad.toLowerCase()},{ where: {id}});
            const datos = await Tarea.findAll({where: {id: tarea}})
            return res.send({ mensaje: "Tarea Modificada", data: datos});

        });

    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});
module.exports = router
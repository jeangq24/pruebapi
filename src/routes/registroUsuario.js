const { Router } = require("express");
const { Persona, Usuario } = require("../db.js");
const {encriptarContraseña} = require("../helpers/handleBcrypt.js");
const router = Router();

router.post("/", async(req, res)=> {
    try {
        //Capturo los datos que se me envian por body, luego valido que el usuario y correo no existan en la base de datos
        const {nombre, apellido, edad, usuario, correo, contraseña} = req.body;
        
        const validacionCorreo = await Usuario.findOne({where: {correo}});
        const validacionUsuario = await Usuario.findOne({where: {usuario}});

        if(validacionCorreo || validacionUsuario) {
            return res.send({mensaje: "el usuario ya existe (verifique correo o usuario)"});
        };
        

        //Luego de validar se encripta la cotraseña y se crea el usuario de esta forma llega a la base de datos
        const contraseñaHash = await encriptarContraseña(contraseña);
        const usuarioCreado = await Usuario.create({
            usuario,
            correo,
            contraseña: contraseñaHash
        });

        const personaCreada = await Persona.create({
            nombre,
            apellido,
            edad,
            usuarioId: usuarioCreado.id
        })
        
        //respondemos con usuario creado.
        res.send(personaCreada);

    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
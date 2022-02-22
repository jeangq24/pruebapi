const Router = require("express");
const { Usuario } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();
const {compararContraseña} = require('../helpers/handleBcrypt.js');
const {SECRET_KEY}= process.env;

router.post("/", async(req,res)=> {
try {

    //Capturo los datos enviados por el body y valido si el usuario existe
    const {usuario, contraseña} = req.body;

    const validacionUsuario = await Usuario.findOne({where: {usuario}});
    if(!validacionUsuario){
        return res.send({mensaje: "el usuario no existe"});
    };

    //Comparo si la contraseña ingresada coincide con la contraseña encriptada.
    const contraseñaComparada = await compararContraseña(contraseña, validacionUsuario.contraseña);
    if(!contraseñaComparada){ 
        return res.send({mensaje: "la contraseña es incorrecta"});
    };

   
    //Una vez que se valida que todo esta bien, se genera un token de autenticacion para futuras peticiones
    jwt.sign({validacionUsuario}, SECRET_KEY, {expiresIn: '1h'}, (error, token)=>{
        if(error) {
            return res.send({mensaje: error});
        }else {
            return res.send({token});
        };
    });
    
} catch (error) {
    res.send(error);;
}
})

module.exports = router

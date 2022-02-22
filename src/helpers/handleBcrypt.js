const bcrypt = require('bcryptjs');

const encriptarContraseña = async(textoPlano) => {
    return await bcrypt.hash(textoPlano, 10);
}

const compararContraseña = async (textoPlano, contraseñaEncriptada) => {
    return await bcrypt.compare(textoPlano, contraseñaEncriptada);
}

module.exports = {encriptarContraseña, compararContraseña};
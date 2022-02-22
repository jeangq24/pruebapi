const verificacionToken = (req, res, next) => {
    let codigoDeAutorizacion = req.headers["authorization"];
   
    if (typeof codigoDeAutorizacion !== "undefined") {
        codigoDeAutorizacion = codigoDeAutorizacion.split(" ")[1];
        req.token= codigoDeAutorizacion;
        next();
    }else {
        res.sendStatus(403);
    }
}

module.exports = verificacionToken;
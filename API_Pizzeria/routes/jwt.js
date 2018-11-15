var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var jwtsimple  = require('jwt-simple')

router.post('/:jwt', function(req, res){
    var secret = req.params.jwt
    token = generarToken(req.body, secret)
    res.status(200).json(token)
})

function generarToken(json, clave){
    jwtsimple.encode(json, clave)
    return token = jwt.sign(json, clave, {
        expiresIn: 60
    })
}

module.exports = router;
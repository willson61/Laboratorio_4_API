var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var jwtsimple  = require('jwt-simple')

router.post('/:jwt', function(req, res){
    var secret = req.params.jwt
    token = generarToken(req.body, secret)
    res.status(200).json(token)
})

router.get('/verify/:jwt', ensureToken, function(req, res){
    var secret1 = req.params.jwt
    jwt.verify(req.token, secret1, function(err, data){
        if(err){
            res.sendStatus(403)
        }
        else{
            res.status(200).json(data)
        }
    })
})

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

function generarToken(json, clave){
    jwtsimple.encode(json, clave)
    return token = jwt.sign(json, clave, {
        expiresIn: 30
    })
}

module.exports = router;
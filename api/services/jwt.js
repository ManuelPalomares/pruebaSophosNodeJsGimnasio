'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
//clave sercreta. 
var secret = 'sophos_solpruebamp';

exports.createToken = function(user){

    var payLoad = {
        sub: user._id,
        nombre : user.nombre,
        email : user.email,
        role   : user.role,
        iat : moment().unix(),
        exp : moment().add(30,'days').unix
    }

    return jwt.encode(payLoad,secret);

};

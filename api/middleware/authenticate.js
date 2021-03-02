'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
//clave sercreta. 
var secret = 'sophos_solpruebamp';

exports.ensureAuth = function(req,res,next){

    if(req.headers.authorization){

       
        

        // en caso de si obtener token
        var token = req.headers.authorization.replace(/['"]+/g,'');

        try {
            var payload = jwt.decode(token,secret);


            //valido que el token no haya expirado
            if(payload.exp <= moment().unix()){
                return res.status(401).send({
                    message : 'token expired'
                }); 
            }
            
            if(payload.role  !== 'USR_ADM'){
                return res.status(401).send({
                    message : 'Invalid permissions'
                }); 
            }

            req.user = payload;
   
            //se ejecutaria el controlador.
            next();

        } catch (error) {

            console.log(error);

            return res.status(404).send({
                message : 'Token no valid'
            });
        }

    }else{
        return res.status(403).send({
            message : 'peticion invalida headers'
        });

    }
};
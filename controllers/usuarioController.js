'use strict'

var Usuario =require('../model/usuario');
var bcrypt = require('bcrypt-nodejs');

function saveUser(req,res){
    
     
    var params = req.body;

    Usuario.findOne({ where: { login: params.login } }).then(function(usuario){

    
        var pwdhash ="";

        if(usuario == null)
        {
            
            if(params.password){
                bcrypt.hash(params.password,null,null,function(err,hash){
                    pwdhash = hash;

                    if(params.login !=null && params.nombre !=null && params.email != null){

                           Usuario.create({ login : params.login, nombre:params.nombre,password:pwdhash,email:params.email}).then(function(){
                                res.status(200).send({
                                message : 'ok'
                                });
                           }).catch(function (error) {
                            res.status(500).send({
                                message : 'Error save'
                                });
                            });
                       

                            
                    }else{
                        res.status(200).send({
                            message : 'Ingrese toda la informacion'
                        });
                    }


                });
            }else{
                res.status(500).send({message: 'Ingresar contraseña'});
            }
          
          
        }else{
            console.log(usuario);
            res.status(500).send({
                message : 'Error datos'
            });
        
        }

    });


}

module.exports = {
    saveUser
};
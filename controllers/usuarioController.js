'use strict'

var Usuario =require('../model/usuario');
var SedesUsuario = require('../model/sedesUsuarios');

var bcrypt = require('bcrypt-nodejs');

function saveUser(req,res){
    
     
    var params = req.body;

    Usuario.findOne({ where: { login: params.login } }).then(function(usuario){

    
        var pwdhash ="";

        if(usuario == null)
        {
            

            if(params.idSede ==null){
                res.status(500).send({
                    message : 'Error save'
                    });
            }

            if(params.password){
                bcrypt.hash(params.password,null,null,function(err,hash){
                    pwdhash = hash;

                    if(params.login !=null && params.nombre !=null && params.email != null){


                        
                         //TODO valida si supera la cantidad de ids de usuario. 
                                    

                           Usuario.create({ login : params.login, nombre:params.nombre,password:pwdhash,email:params.email}).then(function(usercreated){

                                    //rescato id para grabar 
                                    var idcreado = usercreated.id;
                                    var error = false;


                                    SedesUsuario.create({id_sede:params.idSede,id_usuario:idcreado}).then(function(sede){
                                       
                                        error = false;
                                    }).catch(function(err){
                                        console.log(err);

                                        error = true;
                                    });

                                    if(error){
                                        res.status(500).send({
                                            message : 'Error interno server'
                                        });
                                    }
                                    else{
                                        res.status(200).send({
                                            message : 'ok'
                                        });
                                    }
                            


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
         
            res.status(500).send({
                message : 'Error datos'
            });
        
        }

    });


}


function getUserBySede(req,res){

    var params = req.body;
    var idsede = params.idsede;
 
    SedesUsuario.findAll({where:{idsede : idsede}}).then(function(sedes){
        
    });


}

module.exports = {
    saveUser,
    getUserBySede
};
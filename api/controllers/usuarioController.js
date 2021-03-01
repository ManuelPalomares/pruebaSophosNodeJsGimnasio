'use strict'

var Usuario =require('../model/usuario');
var SedesUsuario = require('../model/sedesUsuarios');
var Sede = require('../model/sedes');
var jwt = require('../services/jwt');

const sequelize = require('../conex');
const { Op } = require("sequelize");


var bcrypt = require('bcrypt-nodejs');
const e = require('express');
var cantidadMax = null;



var  obtenerCantidadSede = async function(P_id_sede){
    var resturnvalue = true;

    const  cantidad   =await SedesUsuario.count({
        where: {id_sede : P_id_sede}

    });
    console.log(cantidad);

    const sedec = await Sede.findOne({
        where : {id : P_id_sede}
    });

    console.log("capamax ::: "+sedec.capacidadmax);
    if((cantidad+1) >= sedec.capacidadmax){
        resturnvalue = false;
        
    }
    else{
        resturnvalue = true;
    }
    return resturnvalue;
}


var saveUser = function(req,res){
    
     
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

                        //valida si la sede supera la cantidad de ids de usuario. 
                        obtenerCantidadSede(params.idSede).then(function(limiteCant){
                            if(!limiteCant){
                                res.status(200).send({
                                    message : 'No es posible Crear Usuario Limite de la Sede.'
                                });
                                return;
                            }else{
                          
                                

                                    //registra un usuario
                                    Usuario.create({ login : params.login, nombre:params.nombre,password:pwdhash,email:params.email,role:'USR_NORM'}).then(function(usercreated){

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
                            }
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

    var params = req.params;
    var pidsede = params.idsede;
    
    //consulta los usuarios de la sede especifica.
    sequelize.query('SELECT * FROM usuarios where id in (select id_usuario from sedes_usuarios where id_sede = '+pidsede+')', {
        model: Usuario,
        mapToModel: true // pass true here if you have any mapped fields
      }).then(function(usuarioslist){
        res.status(200).send({
            usuarios : usuarioslist
        });
      });
}


function loginUser(req,res){
    var params = req.body;

    var plogin = params.login; 
    var ppwd = params.password;

    Usuario.findOne({where : 
        { 
            login : plogin.toLowerCase()
        }
    }).then(function(user){
        if(user.id){
          
            bcrypt.compare(ppwd,user.password,function(err,check){
                if(check){

                    //devuelve datos logued
                    if(params.gethash){
                        //devuelve token jwt
                        res.status(200).send({
                            token : jwt.createToken(user)
                       });
                    }
                    else{
                        res.status(200).send({
                             user
                        });
                    }
                }else{
                    res.status(200).send({

                        message :'Login password invalid'
                    });
                }
            });
            
        }


    }).catch(function(e){
        res.status(500).send({
            message : 'Error en la peticion'
        });
    });
}


module.exports = {
    saveUser,
    getUserBySede,
    loginUser
};
'use strict'

var Sedes =require('../model/sedes');

function saveSedes(req,res){
    
    var params = req.body;

    

    if(params.idciudad != null && params.descripcion !=null && params.capacidadmax ){
        Sedes.create({
            idciudad    : params.idciudad,
            descripcion : params.descripcion,
            capacidadmax: params.capacidadmax

        }).then(function(){
            
            res.status(200).send({
                message : 'ok'
                });

        }).catch(function(){
            res.status(500).send({
                message : 'Error'
            });
        });

    }else{
        res.status(500).send({
            message : 'Error de datos'
        });
    }


}

function getListSedes(req,res){
    Sedes.findAll().then(function(sedes){

        console.log(sedes);
        res.status(200).send({
            sedes : sedes
        });
    });
    
}

module.exports = {
    saveSedes,
    getListSedes
};
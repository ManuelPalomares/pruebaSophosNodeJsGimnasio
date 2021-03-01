'use strict'

var Ciudad =require('../model/ciudades');

function saveCiudad(req,res){
    
    var params = req.body;

    
    Ciudad.create({
        descripcion : params.descripcion
    }).then(function(){
        
        res.status(200).send({
            message : 'ok'
            });
    }).catch(function(){
        res.status(500).send({
            message : 'Error'
        });
    });
    


}

function getListCiudades(req,res){
    Ciudad.findAll().then(function(ciudades){

        console.log(ciudades);
        res.status(200).send({
            ciudades : ciudades
        });
    });
    
}

module.exports = {
    saveCiudad,
    getListCiudades
};
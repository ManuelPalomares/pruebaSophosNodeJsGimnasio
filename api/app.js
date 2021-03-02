'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var app = express();


//rutas
var user_routes = require('./routes/usuarios');
var ciudades_routes = require('./routes/ciudades');
var sedes_routes = require('./routes/sedes');


app.use(bodyParser.urlencoded({extented:false}));
app.use(bodyParser.json());

//controlar el cors permitir dominios 
app.use((req,res,next) =>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method,XMLHttpRequest');
	res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
	
	next();
});

//configurar cabeceras

//rutas BASE
app.use('/api',user_routes);
app.use('/api/ciudades/',ciudades_routes);
app.use('/api/sedes/',sedes_routes);




app.get('/prueba',function(req,res){
	res.status(200).send({message: ' Prueba Iniciando'})
});


module.exports = app;
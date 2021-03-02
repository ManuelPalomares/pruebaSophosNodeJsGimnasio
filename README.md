Instructivo Prueba Tecnica Elaborada para Sophos Solutions 
	Autor   : Manuel Palomares


/************************************
	Configuracion inicial
**************************************/
Para ejecutar el aplicativo localmente o  servidor es necesario contar con lo siguiente : 

  Tener instalado Node.js Angular cli en la  siguiente version : 
 
	* Angular CLI: 11.2.2
	* Node: 14.16.0
	* OS: win32 x64


/***********************************************************************************************
	Fase Instructivo Api Rest Backend   
**************************************************************************************************/

1)  Crear Base de datos Mysql con nombre esquema prueba_sophos y con usuario de base de datos  root  o el usuario que se requiera.
	Nota : usuario y el password de la basde datos se debe modificar el archivo : api\conex.js 

2)  Ejecutar Script DML.sql en servidor mysql del esquema creado prueba_sophos.
	Nota : este script inserta un usuario por defecto de la aplicacion :
	
		usr:		 admin
		contraseña   admin 
		
		*Este usuario tiene rol de Administrador 


3) Una vez ejecutar el script DML principal, se debe ejecutar el comando "npm install" en la carpeta \api.  

	Nota : esto instalara todas las dependencias usadas : 
	
	"bcrypt-nodejs": "0.0.3",
	"body-parser": "^1.19.0",
	"express": "^4.17.1",
	"jwt-simple": "^0.5.6",
	"moment": "^2.29.1",
	"mysql": "^2.18.1",
	"mysql2": "^2.2.5",
	"sequelize": "^6.5.0"
	"jest": "^26.6.3",
	"nodemon": "^2.0.7"


4)  Una vez ejecutado el comando de install en la carpeta  se procede a ejecutar el comando "npm start" - Esto inicia el servicio del api

	Nota : el servicio del api se expone en el puerto : 3900 y el mensaje en consola seria : 
	
	creado
	Servidor funcionando 3900
	Executing (default): SELECT 1+1 AS result
	

/*
	Fase Instructivo Front end
*/

5) Se debe ubicar en consola en la carpeta \client\SophosPrueba y ejecutar el comando  ng update   
   Nota : esto actualizara todas las dependencias del proyecto localmente. 
 
6) Ejecucion local  es necesario ejecutar parado en la carpeta \cliente\SophosPrueba el comando "ng serve -o"

7 ) ingresar a la direccion url http://localhost:4200/ donde se depliega en ambiente local. 




/*Archivos PostMan*/

Se Creo la collecion de los servicios con datos ejemplos en la ruta : 
	api\collectionpostman\PostmanPrueba.postman_collection.json
	
Nota : los request de adminitrador y usuario logueado manejan el Header : Autorization este header permite verificar si un usuario esta logueado y el rol que tiene .

/*Pruebas Con Jest*/

Se configuraron 3 pruebas comando para ejecutar parado en \api npm run test


//Módulo para implementar el objeto Express.
var express = require('express');
//Módulo para implementar el pareceo de datos en el cuerpo del documento.
var bodyparser = require('body-parser');
//Módulo la autenticación HTTP para usar tokens en una aplicación Node.
var expressjwt = require('express-jwt');
//Mecanismo que utiliza encabezados adicionales HTTP para permitir que un user agent obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio)
var cors = require('cors');
//Defino una APP con Express
var app = express();
//Importo la conexión a la base de datos que he creado aparte.
var connection = require('./connection');
//Importo las rutas de cada consulta a la base de datos MySql.
var routes = require('./routes');
//Importo los cors, pero al utilizar token, no lo vamos a usar
/*var cors = require('./cors');*/

//Coloco el encoded de la APP
app.use(bodyparser.urlencoded({ extended: true }));
//Determino el tipo de parser como Json.
app.use(bodyparser.json());
//Coloco los cors.
app.use(cors());
//Defino un alisas y una URL para el token
app.use(expressjwt({secret:'secreto'})
	.unless({path:[
		'/auth/login'
	]}));
//Aplico los permisos especificados en los cors
/*app.use(cors.permisos);*/

//Inicio la conexión
connection.inicia();

//Asigno las rutas de la API a la aplicación
routes.configurar(app);

//Escucho en el puerto 8001 en donde será cargada la API
var server = app.listen(8001, function(){
	console.log('Escuchando en el puerto', server.address().port);
});
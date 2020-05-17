//Modulo de conexión
var conexion = require('./connection');
//Modulo del token
var jwt = require('jsonwebtoken');
//Constructor del módulo para las consultas
function MetodosDB(){
	//Consulta para seleccionar todos los registros
	this.seleccionar = function (respuesta) {
		//Obtengo la conexión
		conexion.obtener(function(er,cn){
			//Una vez obtenida la conexión, ejecuto la consulta
			cn.query('select * from inventario', function(error, resultado){
				//Una vez obtenidos los resultados, libero la conexión (hay que soltaaaaar)
				cn.release();
				if (error) {
					//Si me da error, envío un Json con el valor 'Error' en la propiedad 'estado' 
					respuesta.send({ estado: 'Error' });
				}else{
					//De lo contrario, envío el Json completo con los resultados 
					respuesta.send(resultado);
				}
			})
		})
	}
	//Consulta para seleccionar un único registro a partir de un ID
	this.seleccionarId = function(id,respuesta){
		//Obtengo la conexión
		conexion.obtener(function(er,cn){
			//Una vez obtenida la conexión, ejecuto la consulta
			cn.query('select * from inventario where id=?',id,function(error,resultado){
				//Una vez obtenido el resulado, libero la conexión (hay que soltaaaaar)
				cn.release();
				if (error) {
					//Si me da error, envío un Json con el valor 'Error' en la propiedad 'estado' 
					respuesta.send({ estado: 'Error' });
				}else{
					//De lo contrario, envío el Json completo con el resultado 
					respuesta.send(resultado);
				}
			})
		})
	}
	//Consulta para insertar un nuevo registro, debo pasar como parámetro un objeto con todos los datos
	this.insertar = function(datos,respuesta){
		//Obtengo la conexión
		conexion.obtener(function(er,cn){
			//Una vez obtenida la conexión, ejecuto la consulta
			cn.query('insert into inventario set ?',datos,function(error,resultado){
				//Una vez ejecutada la consulta exitosamente, libero la conexión (hay que soltaaaaar)
				cn.release();
				if (error) {
					//Si me da error, envío un Json con el valor 'Error' en la propiedad 'estado' 
					respuesta.send({ estado: 'Error' });
				}else{
					//De lo contrario, envío un Json con el valor 'OK' en la propiedad 'estado' 
					respuesta.send({ estado: 'OK' });
				}
			})
		})
	}
	//Consulta para modificar un registro, debo pasar como parámetro un objeto con los datos que deseo modificar
	this.actualizar = function(datos,respuesta){
		//Obtengo la conexión
		conexion.obtener(function(er,cn){
			//Una vez obtenida la conexión, ejecuto la consulta con los datos y el ID del registro a modificar
			cn.query('update inventario set ? where id = ?',[datos, datos.id],function(error,resultado){
				//Una vez ejecutada la consulta exitosamente, libero la conexión (hay que soltaaaaar)
				cn.release();
				if (error) {
					//Si me da error, envío un Json con el valor 'Error' en la propiedad 'estado' 
					respuesta.send({ estado: 'Error' });
				}else{
					//De lo contrario, envío un Json con el valor 'OK' en la propiedad 'estado' 
					respuesta.send({ estado: 'OK' });
				}
			})
		})
	}
	//Consulta para eliminar un registro
	this.borrar = function(id,respuesta){
		//Obtengo la conexión
		conexion.obtener(function(er,cn){
			//Una vez obtenida la conexión, ejecuto la consulta el ID del registro a borrar
			cn.query('delete from inventario where id = ?',id,function(error,resultado){
				//Una vez ejecutada la consulta exitosamente, libero la conexión (hay que soltaaaaar)
				cn.release();
				if (error) {
					//Si me da error, envío un Json con el valor 'Error' en la propiedad 'estado' 
					respuesta.send({ estado: 'Error' });
				}else{
					//De lo contrario, envío un Json con el valor 'OK' en la propiedad 'estado' 
					respuesta.send({ estado: 'OK' });
				}
			})
		})
	}
	//Consulta para dar de alta a los usuarios al listado de productos
	this.login = function(datos,respuesta){
		//Obtengo la conexión
		conexion.obtener(function(er,cn){
			//Una vez obtenida la conexión, ejecuto la consulta con el usuario y pasword del objeto 'datos'
			cn.query('select * from usuarios where user=? and pass=?',[datos.user,datos.pass],function(error,resultado){
				//Una vez ejecutada la consulta exitosamente, libero la conexión (hay que soltaaaaar)
				cn.release();
				if (error) {
					//Si me da error, envío un la cadena de texto 'Error' 
					respuesta.send('Error');
				}else{
					//De lo contrario me aseguro que haya encontrado un usuario  
					if(resultado.length == 0){
						//Si no lo encontró, envío la cadena de texto 'nofound'  
						respuesta.send('nofound');
					}else{
						//Si encontró un usuario efectivamente con esos datos, envío un token con estos datos: un objeto con nombre del usuario y rol, un alias y un objeto con el dato: tiempo de espiración del token
						var token = jwt.sign({
							user: datos.user,
							rol: 'admin'
						},'secreto',{ expiresIn: '120s'});
						respuesta.send(token);
					}
				}
			})
		})
	}
}
//Exporto el módulo para las consultas
module.exports = new MetodosDB();
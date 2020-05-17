//Módulo para las consultas
var db = require('./queries');
//Constructor del módulo para las rutas
function http(){
	//Método para asignar las rutas de la API, paso como parámetro la aplicación de Express
	this.configurar = function(app){
		//Con GET obtengo el listado completo de productos
		app.get('/inventario/',function(solicitud,respuesta){
			//Ejecuto el método 'seleccionar'dentro del múdulo de consultas y obtendré el Json con los resutlados
			db.seleccionar(respuesta);
		});
		//Con GET y el parámetro id que recibo, obtengo un producto en particular
		app.get('/inventario/:id/',function(solicitud,respuesta){
			//Ejecuto el método 'seleccionarId'dentro del múdulo de consultas y obtendré el Json con un producto en particular, para ello debo pasar como parámetro exclusivamente el ID del parámetro
			db.seleccionarId(solicitud.params.id,respuesta);
		});
		//Con POST y el parámetro con el objeto qeu recibo -datos para el nuevo producto- inserto un nuevo producto
		app.post('/inventario/',function(solicitud,respuesta){
			db.insertar(solicitud.body,respuesta);
		});
		//Con PUT y el parámetro con el objeto que recibo -con los datos a modificar- modifico un producto existente
		app.put('/inventario/',function(solicitud,respuesta){
			db.actualizar(solicitud.body,respuesta);
		});
		//Con DELETE y el parámetro id que recibo, borro un producto en particular 
		app.delete('/inventario/:id/',function(solicitud,respuesta){
			db.borrar(solicitud.params.id,respuesta);
		});
		//Con POST y el parámetro de datos que recibo (user y pass), intento loggear a un usuario
		app.post('/auth/login/',function(solicitud,respuesta){
			db.login(solicitud.body,respuesta);
		})
	}
}
//Exporto el módulo para las rutas
module.exports = new http();
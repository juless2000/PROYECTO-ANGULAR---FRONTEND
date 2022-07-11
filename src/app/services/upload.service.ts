// Servicio para subir imagenes al crear proyectos
import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
	// para definir mi propiedad de la url de api
	public url: string;

	constructor(){
		this.url = Global.url;
	}

	// makeFileRequest => Permite hacer una peticion ajax clasica, en la cual vamos a 
	// adjuntar un archivo para subir
	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
		// Creamos una promesa con func de callback
		// resolve -> promesa resuelta
		// reject -> no se resolvio por un error
		return new Promise(function(resolve, reject){
			// Definir la petiicon ajax para subir un archivo
			// FormData -> Nos permite crear un formulario en un objeto
			var formData:any = new FormData();
			// xhr -> sinónimo de AJAX	y va a contener un objeto XMLHttpRequest
			// q es un objeto de peticiones asíncronas de JS.
			var xhr = new XMLHttpRequest();
			// Recorrer el archivo q nos está llegando
			// Recorre todos los ficheros q me llegan
			for(var i=0; i < files.length; i++){
				// y adjuntamelo al formulario con:
				// name -> el nombre que llega como param
				// files[i], files[i].name) -> añade el archivo y recoje su nombre 
				formData.append(name, files[i], files[i].name);
			}

			// Comprobamos el estado de la petici+on ajax
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						// Si el resultado es positivo que nos devuelva la respuesta positiva
						resolve(JSON.parse(xhr.response));
					}else {
						// si no que nos devuelva el error
						reject(xhr.response);
					}
				}
			}

			// Hacemos la petición por post y a la url que le indiquemos 
			xhr.open('POST', url, true);
			// Ejecutamos la petición ajax
			xhr.send(formData);

		})

	}
} 
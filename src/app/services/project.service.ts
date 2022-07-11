/* Importamos lo necesario para el servicio */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Modelo del project
import { Project } from '../models/project';
// Configuracion global
import { Global } from './global';

@Injectable()
export class ProjectService{
	// propiedad del servicio
	public url: string;

	// definimos el servicio en el constructor
	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	} 

	// métodos de prueba
	testService(){
		return 'Probando el servicio de Angular';
	}

	// Metodo para guardar nuevos elementos en la BD
	saveProject(project: Project): Observable<any>{
		// Convertimos los params en objetos JSON
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'save-project', params, {headers: headers});
	}

	// Metodo para listar los proyectos de la BD
	getProjects(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		// peticion http get para el listado
		return this._http.get(this.url+'projects', {headers: headers});
	}

	// 1. Metodo para sacar un único proyecto
	// id para pasarselo al Api/ buscar en la Bd
	getProject(id:any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		// peticion http get para el detalle con su id
		return this._http.get(this.url+'project/'+id, {headers: headers});
	}

	// eliminar proyectos
	deleteProjects(id:any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'project/'+id, {headers: headers});
	}

	// Actualizar proyectos
	updateProject(project: any): Observable<any>{
		// convertimos el proyecto en objeto json string
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		// retornamos los params del proyecto completo porque se actualizan cada uno de los datos
		return this._http.put(this.url+'project/'+project._id, params, {headers: headers});
	}
}
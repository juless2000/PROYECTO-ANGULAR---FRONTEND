import { Component, OnInit } from '@angular/core';
// Impostamos el servicio y el modelo
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  // Agregamos el servicio al component
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
	// Propiedades para mostrar el listado en la vista
	public projects: Project[];
	public url: string;

  constructor(
  	// Inicializamos el ProjectService
  	private _ptojectService : ProjectService
  ) {
  	this.projects = [];
  	this.url = Global.url;
  }

  ngOnInit(): void {
  	// Ejecutamos el metodo al cargar 
  	this.getProjects();
  }

  // Metodo para el listado
  getProjects(){
  	// Nos suscribimos al metodo getProjects del service
  	this._ptojectService.getProjects().subscribe(
  		response => {
  			if(response.projects){
  				this.projects = response.projects;
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}

  	)
  }

}

import { Component, OnInit } from '@angular/core';
// Impostamos el servicio y el modelo
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
// Componentes del router para recoger el id de la url q nos llega
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  // importamos el servicio
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  // Propiedades
	public url: string;
  // para la response
	public project: Project;
  // confirmacion de borrado
  public confirm: boolean;

  constructor(
    // Inicializamos el servicio
  	private _projectService: ProjectService,
    // Inyectamos los componentes del router
  	private _router: Router,
  	private _route: ActivatedRoute
  ) {
    // Inicializamos la propiedad project del modelo
  	this.project = new Project('', '', '', '', 2022, '', '');
  	this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
    // Recoger el parametro id por la Url con el ActivatedRoute y params
  	this._route.params.subscribe(params => {
  		let id = params['id'];
      // pasamos el id al metodo recien creado
  		this.getProject(id);
  	})
  }

  // Metodo para invocar el metodo del service getProject, el cual
  // realiza una peticion AJAX al backend
  getProject(id:any){

    // Recibe un id para pasarselo al metodo del servicio
  	this._projectService.getProject(id).subscribe(
  		response => {
        // capturamos el objeto project por id
  			this.project = response.project;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  // Metodo para la confirmacion de borrado
  setConfirm(confirm:any){
    this.confirm = confirm;
  }

  // Metodo para invocar el metodo del servicio para el delete
  deleteProject(id:any){
    this._projectService.deleteProjects(id).subscribe(
        response => {
          if(response.project){
            this._router.navigate(['/proyectos']);
          }
        },
        error => {
          console.log(<any>error);
        }
     )
  }

}

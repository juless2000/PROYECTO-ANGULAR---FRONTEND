import { Component, OnInit } from '@angular/core';
// Importamos el modelo y servicio
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
// Componentes del router para recoger el id de la url q nos llega
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  // Cargamos el servicio con provider
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  // Propiedades
  public title: string;
  // Propiedades
  public url: string;
  public project: Project; 
  // Para el routerlink del detalle
  public save_project: any;
  // para vaciar formulario
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
  	private _projectService: ProjectService,
    private _uploadService: UploadService,
    // Inyectamos los componentes del router
  	private _router: Router,
  	private _route: ActivatedRoute
  ) {
    this.status = "";
    this.url = Global.url;
  	this.title = "Editar proyecto";
  	// Creamos el objeto guiado por el models
  	this.project = new Project('', '', '', '', 2022, '', '');
    this.filesToUpload = [];

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
        // nos rellena automaticamente la vista porque ya no inicializamos 
        // el project con datos vacios
  			this.project = response.project;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  // Metodo onSubmit del ngSubmit
  onSubmit(form:any){
  	this._projectService.updateProject(this.project).subscribe(
  		response => {
	        if(response.project){

	          if(this.filesToUpload.length){
	          	  //Subir la imagen
		          // los parametros son los que están en el service upload 
		          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
		          .then((result:any) => {
		          	// guardar los datos del resultado al crear el nuevo doc
			        this.save_project = result.project;
			        this.status = 'success';
			        //this._router.navigate(['/proyectos']);
		          });

	          }else{
	          	// guardar los datos del resultado al crear el nuevo doc
		        this.save_project = response.project;
		        this.status = 'success';
		        //this._router.navigate(['/proyectos']);
	          }			


        }else{
          this.status = 'failed';
        }
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  // Metodo para capturar el archivo subido
  fileChangeEvent(fileInput: any){
    // Forzamos a que sea un tipo File
    // capturamos todos los archivos seleccionados por el input
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

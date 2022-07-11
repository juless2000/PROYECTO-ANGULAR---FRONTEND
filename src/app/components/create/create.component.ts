import { Component, OnInit } from '@angular/core';
// Importamos el modelo y servicio
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  // Cargamos el servicio con provider
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

	// Propiedades
	public title: string;
	public project: Project; 
  public url: string;
  // Para el routerlink del detalle
  public save_project: any;
  // para vaciar formulario
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
  	private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.status = "";
  	this.title = "Crear proyecto";
    this.url = Global.url;
  	// Creamos el objeto guiado por el models
  	this.project = new Project('', '', '', '', 2022, '', '');
    this.filesToUpload = [];

  }

  ngOnInit(): void {
  }

	// Metodo onSubmit del ngSubmit
  onSubmit(form:any){
  	// Para ver si los datos se estan rellenando conrrectamente 
  	//console.log(this.project);
    // Utilizamos el metodo del service saveProject
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
          //Subir la imagen
          if(this.filesToUpload){
            // los parametros son los que están en el service upload 
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              // guardar los datos del resultado al crear el nuevo doc
              this.save_project = result.project;

              this.status = 'success';
              console.log(result);
              form.reset();
            });
          }else{
              this.save_project = response.project;
              this.status = 'success';
              form.reset();
          }


        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Metodo para capturar el archivo subido
  fileChangeEvent(fileInput: any){
    // Forzamos a que sea un tipo File
    // capturamos todos los archivos seleccionados por el input
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

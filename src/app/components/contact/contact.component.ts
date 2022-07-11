// COMPONENTE PADRE
// ViewChild -> Recoger el div con nombre textos 
import { Component, OnInit, ViewChild } from '@angular/core';
// import * as $ from 'jquery';
declare var $:any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	// Propiedad para modificar con el TWDB 
  public widthSlider: number;
	public anchuraToSlider: any;
  public captions: boolean;
  // propiedad para mostrar los datos del evento
  public autor: any;
  // ViewChild
  @ViewChild('textos', {static:true}) textos:any;

  constructor() {
  	this.widthSlider = 0;
    this.anchuraToSlider = 0;
    this.captions = true;
  }

  ngOnInit(): void {
    //var opcion_clasica = document.querySelector('#texto').innerHTML;
    console.log(this.textos.nativeElement.textContent);

  }

  cargarSlider(){
    // Le pasamos el tamaño q tiene el widthSlider a la anchuraToSlider
  	this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    // que elimine el valor del anchuraToSlider para resetear
    this.anchuraToSlider = false;
  }

  // Metodo de la etiqueta con el evento
  getAutor(event:any){
    // guardamos los datos del evento en autor
    this.autor = event;
  }

}

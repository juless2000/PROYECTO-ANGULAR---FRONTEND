// COMPONENTE HIJO

// Output -> de hijo a padre compartir informacion
// Input -> de padre a hijo, compartir informacion
// EventEmiter -> Crear eventos nosotros mismos 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  // Decorador input para recoger/recibir la propiedad q le estoy pasando del padre
  @Input() anchura: number;
  // Por si queremos que la varibale tenga otro nombre
  @Input('etiquetas') captions: boolean;
  // output para devolver/emitir un valor/propiedad con un evento
  @Output() conseguirAutor = new EventEmitter(true);

  // Propiedades
  public autor: any; 

  constructor() { 
    this.anchura = 0;
    this.captions = false;

    // Propiedad autor objeto JSON
    this.autor = {
      nombre: "Julian Muñoz",
      website: "julescode.com",
      youtube: "Julian Code"
    };
  }

  ngOnInit(): void {
    // Ponemos la galeria del slider y el evento del logo
  	$("#logo").click(function(e:any){
  		e.preventDefault();
  		$("header").css("background","green")
  				   .css("height","50px"); 	
  	});

    $('.galeria').bxSlider({
      mode: 'fade',
      captions: this.captions,
      // pasamos la propiedad anchura 
      slideWidth: this.anchura
    });

    // Lanzar evento
    //this.conseguirAutor.emit(this.autor);    
  }

  // Evento para que lance el EventEmitter
  lanzar(event:any){
    // emit -> para emitir un dato
    this.conseguirAutor.emit(this.autor);
  }

}

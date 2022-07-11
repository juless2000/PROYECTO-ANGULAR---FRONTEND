// DIRECTIVA RESALTADO -> ng g directive resaltado en el CMD
// ElementRef -> Al aplicar la directiva a un elemento, me consigue el objeto nativo
// nativeElement -> propiedad del elemento html q se ha seleccionado
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor( public el: ElementRef) {

  }

  ngOnInit(){
  	// aplicando estilos con la directiva al parrafo de contacto
  	var element = this.el.nativeElement;

  	element.style.background = "blue";
  	element.style.padding = "20px";
  	element.style.marginTop = "15px";
  	element.style.color = "white";

  	element.innerText = element.innerText.toUpperCase().replace("CONTACTO", "||||");
  }
}

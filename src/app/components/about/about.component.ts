import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	// Propiedades de about
	public title: string;
	public subtitle: string;
	public email: string; 

  constructor() {
  	this.title = "Julian Muñoz";
  	this.subtitle = "Desarrollador web Front End";
  	this.email = "munozjulian16@gmail.com";
  }

  ngOnInit(): void {
  }

}

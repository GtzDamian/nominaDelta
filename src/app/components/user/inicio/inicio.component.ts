import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private title: Title
  ) { 
    this.title.setTitle("Inicio | Información Gerencial - Nómina")
  }

  ngOnInit(): void {
  }

}

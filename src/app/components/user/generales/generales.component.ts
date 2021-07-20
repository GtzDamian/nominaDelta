import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Control } from 'src/app/models/dto/control';
import { ControlService } from 'src/app/models/services/control.service';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

  control: Control = new Control();

  constructor(
    private title: Title,
    private controlService: ControlService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.title.setTitle("Datos Generales | Información Gerencial - Nómina")
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
        if(id){
          this.controlService.getDatos(id).subscribe(
            (control) => {
              this.control = control;
            }
          )
        }
      }) 
  }
}

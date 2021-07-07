import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/models/services/auth.service';
import { PuestoService } from 'src/app/models/services/puesto.service';
import { Puesto } from 'src/app/models/dto/puesto';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {

  public puesto:Puesto = new Puesto();
  puestos!: Puesto[];

  constructor( private puestoService: PuestoService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Puestos | Información Gerencial - Nómina");
    } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.puestoService.getPuestos(id).subscribe(
          (puestos) => {this.puestos = puestos}
        )
      }
    }) 
  }

  filtro(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
        if(id){
          this.puestoService.getPuestosFiltro(id, this.puesto.puesto, this.puesto.nombre).subscribe(
            (puestos) => {this.puestos = puestos}
          )
        }
      }) 
    }

}

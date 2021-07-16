import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/models/dto/division';
import { DivisionService } from 'src/app/models/services/division.service';
import { AuthService } from 'src/app/models/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-divisiones',
  templateUrl: './divisiones.component.html',
  styleUrls: ['./divisiones.component.css']
})
export class DivisionesComponent implements OnInit {

  public division:Division = new Division();
  divisiones!: Division[];


  constructor(
    private divisionService: DivisionService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Divisiones | Información Gerencial - Nómina");
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.divisionService.getDivisiones(id).subscribe(
          (divisiones) => {this.divisiones = divisiones}
        )
      }
    })
  }

  public delete(division: Division):void{
    Swal.fire({
      title: 'Borrar Empresa',
      text: `¿Desea eliminar la Division ${division.division} - ${division.nombre}?`,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.divisionService.delete(division.id).subscribe(
          response => {
            Swal.fire('Eliminada', `La división ${division.division} - ${division.nombre} ha sido eliminada`,'success').
            then(function(){ 
              location.reload();
            });
          }
        )
      }
    })
  }

}

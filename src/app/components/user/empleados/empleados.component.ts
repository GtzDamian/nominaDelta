import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/dto/empleado';
import { AuthService } from 'src/app/models/services/auth.service';
import { EmpleadoService } from 'src/app/models/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleado: Empleado = new Empleado();
  empleados!: Empleado[]; 

  constructor(
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Empleados | Información Gerencial - Nómina");
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empleadoService.getEmpleados(id).subscribe(
          (empleados) => {
            this.empleados = empleados}
        )
      }
    })
  }

  filtro(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
        if(id){
          this.empleadoService.getEmpleadosFiltro(id, this.empleado.empleado, this.empleado.nombre, this.empleado.departamento, this.empleado.puesto).subscribe(
            (empleados) => {this.empleados = empleados}
          )
        }
      }) 
    }
}

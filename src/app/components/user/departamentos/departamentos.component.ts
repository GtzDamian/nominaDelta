import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/models/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Departamento } from 'src/app/models/dto/departamento';
import { DepartamentoService } from 'src/app/models/services/departamento.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  
  public departamento:Departamento = new Departamento();
  departamentos!: Departamento[];

  constructor(
    private departamentoService: DepartamentoService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Departamentos | Información Gerencial - Nómina");
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.departamentoService.getDepartamentos(id).subscribe(
          (departamentos) => {this.departamentos = departamentos}
        )
      }
    })
  }

  filtro(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
        if(id){
          this.departamentoService.getDepartamentosFiltro(id, this.departamento.departamento, this.departamento.nombre).subscribe(
            (departamentos) => {this.departamentos = departamentos}
          )
        }
      }) 
    }
}

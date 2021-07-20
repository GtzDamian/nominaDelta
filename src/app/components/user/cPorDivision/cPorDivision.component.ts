import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DivisionService } from 'src/app/models/services/division.service';
import { Division } from 'src/app/models/dto/division';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-c-por-division',
  templateUrl: './cPorDivision.component.html',
  styleUrls: ['./cPorDivision.component.css']
})
export class CPorDivisionComponent implements OnInit {

  division: Division = new Division();
  divisiones!: Division[];
  impCheck: boolean= false;
  empCheck: boolean = false;
  
  

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private divisionService: DivisionService) { 
      this.title.setTitle("Consulta Por División | Información Gerencial Nómina")
    }

  ngOnInit(): void {
    this.cargarDivisiones();
  }

  cargarDivisiones(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.divisionService.getDivisionesConsulta(id).subscribe(
          (divisiones) => {this.divisiones = divisiones}
        )
      }
    })
  }

  filtroImportes(){
    if(this.impCheck == false){
      this.impCheck = true;
    }else{
      this.impCheck = false;
    }
  }

  filtroEmpleados(){
    if(this.empCheck == false){
      this.empCheck = true;
    }else{
      this.empCheck = false;
    }
  }
}

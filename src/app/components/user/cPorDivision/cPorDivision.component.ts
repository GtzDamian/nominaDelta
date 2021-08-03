import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DivisionService } from 'src/app/models/services/division.service';
import { Division } from 'src/app/models/dto/division';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/models/dto/empresa';
import { EmpresaService } from 'src/app/models/services/empresa.service';

@Component({
  selector: 'app-c-por-division',
  templateUrl: './cPorDivision.component.html',
  styleUrls: ['./cPorDivision.component.css']
})
export class CPorDivisionComponent implements OnInit {

  division: Division = new Division();
  divisiones!: Division[];
  impCheck: boolean= true;
  empCheck: boolean = false;
  nivel: number = 0;
  rfc!: string;
  empresa:Empresa = new Empresa();
  registrosTotales!: number;
  blob!: Blob;
  
  

  constructor(
    private empresaService: EmpresaService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private divisionService: DivisionService) { 
      this.title.setTitle("Consulta Por División | Información Gerencial Nómina")
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.rfc = id;
      if(id){
        this.divisionService.getDivisionesConsulta(id).subscribe(
          (divisiones) => {
            this.divisiones = divisiones;
            this.registrosTotales = divisiones.length;
          }
        )
      }
    })


    this.cargarEmpresa();
  }

  cargarEmpresa(){
    this.empresaService.getEmpresaByRfc(this.rfc).subscribe(
      (empresa) =>{
        this.empresa = empresa;
      }
    )
  }

  checkImp(){
    if(this.impCheck == false){
      this.impCheck = true;
    }else{
      this.impCheck = false;
    }
    if(this.impCheck == false && this.empCheck == false){
      this.empCheck = true;
    }
  }

  checkEmp(){
    if(this.empCheck == false){
      this.empCheck = true;
    }else{
      this.empCheck = false;
    }
    if(this.impCheck == false && this.empCheck == false){
      this.impCheck = true;
    }
  }

  filtro(){
    if(this.rfc){
      this.divisionService.filtroDivisiones(this.rfc, this.nivel).subscribe(
        (divisiones) =>{
          this.divisiones = divisiones;
          this.registrosTotales = divisiones.length;
        }
      )
    }
  }

  exportExcel(){
    let fecha = new Date();
    let options = {year: 'numeric', month: 'long', day: 'numeric'} as const;

    if(this.rfc){
      this.divisionService.exportExcel(this.rfc, this.nivel, this.empresa.razonSocial, this.registrosTotales, this.impCheck, this.empCheck).subscribe(
        (data)=>{
          this.blob = new Blob([data], {type: 'application/octet-stream'});
          var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = "Consulta Por División al " + fecha.toLocaleDateString('es-MX', options) + ".xlsx";
          link.click();
        }
      )
    }
  }
}

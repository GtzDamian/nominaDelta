import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/models/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Departamento } from 'src/app/models/dto/departamento';
import { DepartamentoService } from 'src/app/models/services/departamento.service';
import { Empresa } from 'src/app/models/dto/empresa';
import { EmpresaService } from 'src/app/models/services/empresa.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  
  public departamento:Departamento = new Departamento();
  departamentos!: Departamento[];
  empresa: Empresa = new Empresa;
  registrosTotales!: number; 
  rfc!: string;
  blob!: Blob;

  constructor(
    private departamentoService: DepartamentoService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Departamentos | Información Gerencial - Nómina");
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.rfc = id;
      if(id){
        this.departamentoService.getDepartamentos(id).subscribe(
          (departamentos) => {
            this.departamentos = departamentos;
            this.registrosTotales = departamentos.length;
          }
        )
      }
    })

    this.cargarEmpresa()
  }

  cargarEmpresa(){
    this.empresaService.getEmpresaByRfc(this.rfc).subscribe(
      (empresa) =>{
        this.empresa = empresa;
      }
    )
  }

  filtro(){
    if(this.rfc){
      this.departamentoService.getDepartamentosFiltro(this.rfc, this.departamento.departamento, this.departamento.nombre).subscribe(
        (departamentos) => {
          this.departamentos = departamentos;
          this.registrosTotales = departamentos.length;
        }
      )
    }
    }


    exportPdf(){
      let fecha = new Date();
       //alert(this.rfc + "_" + this.departamento.departamento + "_" + this.departamento.nombre + "_" + this.empresa.razonSocial + "_" + this.registrosTotales);
         if(this.rfc){
            this.departamentoService.file(this.rfc, this.departamento.departamento, this.departamento.nombre, this.empresa.razonSocial, this.registrosTotales).subscribe(
              (data) =>{
                this.blob = new Blob([data], {type: 'application/pdf'});
                var downloadURL = window.URL.createObjectURL(data);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = "Reporte de Departamentos al " + fecha.getDate() + "_" + fecha.getMonth() + "_" + fecha.getFullYear() + ".pdf";
                link.click();
              }
            );
          }
    }
}

import { Component, OnInit } from '@angular/core';
import { ConceptoService } from 'src/app/models/services/concepto.service';
import { AuthService } from 'src/app/models/services/auth.service';
import { EmpresaService } from 'src/app/models/services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Concepto } from 'src/app/models/dto/concepto';
import { Empresa } from 'src/app/models/dto/empresa';

declare var $: any;

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.css']
})
export class ConceptoComponent implements OnInit {

  public concepto:Concepto = new Concepto();
  rfc!: string;
  conceptos!: Concepto[];
  registrosTotales!: number;
  empresa: Empresa = new Empresa();

  blob!: Blob;

  constructor(
    private conceptoService: ConceptoService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Conceptos | Información Gerencial - Nómina");
    }

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    let id = params['id'];
    this.rfc = id;
    if(id){
      this.conceptoService.getConceptos(id).subscribe(
        (conceptos) => {
          this.conceptos = conceptos;
          this.registrosTotales = conceptos.length;
        }
      )
    }
  }) 

  this.cargarEmpresa();
 
}

cargarEmpresa(){
  this.empresaService.getEmpresaByRfc(this.rfc).subscribe(
    (empresa) => {
      this.empresa = empresa
    }
  )
}
  
filtro(){
  if(this.rfc){
    this.conceptoService.getConceptosFiltro(this.rfc, this.concepto.concepto, this.concepto.nombre).subscribe(
      (conceptos) => {
        this.conceptos = conceptos;
        this.registrosTotales = conceptos.length;
      }
    )
  }
  }

exportPdf(){
  let fecha = new Date();
    //alert(id + "_" + this.concepto.concepto + "_" + this.concepto.nombre + "_" + this.empresa.razonSocial + "_" + this.registrosTotales);
      if(this.rfc){
        this.conceptoService.file(this.rfc, this.concepto.concepto, this.concepto.nombre, this.empresa.razonSocial, this.registrosTotales).subscribe(
          (data) =>{
            this.blob = new Blob([data], {type: 'application/pdf'});
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "Reporte de Conceptos al " + fecha.getDate() + "_" + fecha.getMonth() + "_" + fecha.getFullYear() + ".pdf";
            link.click();
          }
        );
      }
}


}

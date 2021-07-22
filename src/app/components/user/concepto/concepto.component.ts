import { Component, OnInit } from '@angular/core';
import { ConceptoService } from 'src/app/models/services/concepto.service';
import { AuthService } from 'src/app/models/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Concepto } from 'src/app/models/dto/concepto';


declare var $: any;

@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.css']
})
export class ConceptoComponent implements OnInit {

  public concepto:Concepto = new Concepto();
  conceptos!: Concepto[];
  registrosTotales!: number;
  blob!: Blob;

  constructor(
    private conceptoService: ConceptoService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Conceptos | Información Gerencial - Nómina");
    }

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.conceptoService.getConceptos(id).subscribe(
        (conceptos) => {
          this.conceptos = conceptos;
          this.registrosTotales = conceptos.length;
        }
      )
    }
  }) 
}
  
filtro(){
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
      if(id){
        this.conceptoService.getConceptosFiltro(id, this.concepto.concepto, this.concepto.nombre).subscribe(
          (conceptos) => {
            this.conceptos = conceptos;
            this.registrosTotales = conceptos.length;
          }
        )
      }
    }) 
  }

exportPdf(){
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
      if(id){
        this.conceptoService.file(id, this.concepto.concepto, this.concepto.nombre).subscribe(
          (data) =>{
            this.blob = new Blob([data], {type: 'application/pdf'});
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "help.pdf";
            link.click();
          }
        );
      }
    }) 
}

/*
public create():void{
    if(this.empresa.rfc == null ||  this.empresa.rfc == '' || this.empresa.razonSocial == null || this.empresa.razonSocial == ''){
      Swal.fire('Error', 'RFC o Razón Social vacíos', 'error')
    }else{
      this.empresaService.create(this.empresa).subscribe(empresa => {
        Swal.fire('Registro exitoso', this.empresa.razonSocial + ' registrada correctamente', 'success');
        this.router.navigate(['/sig/admin'])
      })
    }
  }*/ 
}

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
          (conceptos) => {this.conceptos = conceptos}
        )
      }
    })  

  }
  
    filtro(){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.conceptoService.getConceptosFiltro(id, this.concepto.concepto, this.concepto.nombre).subscribe(
            (conceptos) => {this.conceptos = conceptos}
          )
        }
      }) 
    }

}

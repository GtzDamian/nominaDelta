import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/models/services/auth.service';
import { PuestoService } from 'src/app/models/services/puesto.service';
import { Puesto } from 'src/app/models/dto/puesto';
import { Empresa } from 'src/app/models/dto/empresa';
import { EmpresaService } from 'src/app/models/services/empresa.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {

  public puesto:Puesto = new Puesto();
  puestos!: Puesto[];
  empresa: Empresa = new Empresa();
  rfc!: string;
  registrosTotales!: number;
  blob!: Blob;

  constructor( private puestoService: PuestoService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Puestos | Información Gerencial - Nómina");
    } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.rfc = id;
      if(id){
        this.puestoService.getPuestos(id).subscribe(
          (puestos) => {
            this.puestos = puestos;
            this.registrosTotales = puestos.length;
          
          }
        )
      }
    }) 

    this.cargarEmpresa();
  }

  cargarEmpresa(){
    this.empresaService.getEmpresaByRfc(this.rfc).subscribe(
      (empresa)=>{
        this.empresa = empresa;
      }
    )
  }

  filtro(){
    if(this.rfc){
      this.puestoService.getPuestosFiltro(this.rfc, this.puesto.puesto, this.puesto.nombre).subscribe(
        (puestos) => { 
          this.puestos = puestos;
          this.registrosTotales = puestos.length;
        }
      )
    }
    }

    exportPdf(){
      let fecha = new Date();
        //alert(id + "_" + this.concepto.concepto + "_" + this.concepto.nombre + "_" + this.empresa.razonSocial + "_" + this.registrosTotales);
          if(this.rfc){
            this.puestoService.file(this.rfc, this.puesto.puesto, this.puesto.nombre, this.empresa.razonSocial, this.registrosTotales).subscribe(
              (data) =>{
                this.blob = new Blob([data], {type: 'application/pdf'});
                var downloadURL = window.URL.createObjectURL(data);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = "Reporte de Puestos al " + fecha.getDate() + "_" + fecha.getMonth() + "_" + fecha.getFullYear() + ".pdf";
                link.click();
              }
            );
          }
    }

}

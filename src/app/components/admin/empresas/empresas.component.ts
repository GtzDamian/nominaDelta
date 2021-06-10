import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../models/dto/empresa';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../models/services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  titulo: string = "Delta Consultores, S. C.";

  empresas!: Empresa[];
  public empresa: Empresa = new Empresa();

  constructor(private title: Title, private empresaService: EmpresaService, private router: Router) {
    this.title.setTitle("Admin | Información Gerencial - Nómina");
   }

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe(
      (empresas) => { this.empresas = empresas }
    )
  }

  public delete(empresa: Empresa):void{
    Swal.fire({
      title: 'Borrar Empresa',
      text: `¿Desea eliminar a ${empresa.razonSocial}?`,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.delete(empresa.rfc).subscribe(
          response => {
            Swal.fire('Eliminada', `${empresa.razonSocial} ha sido eliminada`,'success').
            then(function(){ 
              location.reload();
            });
          }
        )
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/dto/usuario';
import { Empresa } from '../../../models/dto/empresa';
import { UsuarioService } from '../../../models/services/usuario.service';
import { EmpresaService } from '../../../models/services/empresa.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  rfc!: string;

  empresas!:Empresa[];
  public empresa: Empresa = new Empresa();

  usuarios!: Usuario[];
  public usuario: Usuario = new Usuario();
 
  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private location: Location) {
   }

  ngOnInit(): void {
    var datos: any = this.location.getState();
    var rfc = Object.values(datos)[0];
    this.cargarUsuarios(rfc);
    this.cargarEmpresa(rfc);
    
  }

  cargarUsuarios(rfc: any): void{
    this.usuarioService.getUsuarios(rfc).subscribe( (usuarios) => this.usuarios = usuarios) 
  }

  cargarEmpresa(rfc: any): void{
    this.empresaService.getEmpresa(rfc).subscribe((empresa) => this.empresa = empresa)
  }

  borrarUsuario(usuario: Usuario): void{
    Swal.fire({
      title: 'Borrar Usuario',
      text: `¿Desea eliminar a ${usuario.username}?`,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            Swal.fire('Eliminado', `${usuario.username} ha sido eliminado`,'success').
            then(function(){ 
              location.reload();
            });
          }
        )
      }
    })
  }
}

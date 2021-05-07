import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/dto/usuario';
import { Empresa } from '../../../models/dto/empresa';
import { UsuarioService } from '../../../models/services/usuario.service';
import { EmpresaService } from '../../../models/services/empresa.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  empresas!:Empresa[];
  public empresa: Empresa = new Empresa();

  usuarios!: Usuario[];
  public usuario: Usuario = new Usuario();
 
  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarEmpresa();
    
  }

  cargarUsuarios(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuarios(id).subscribe( (usuarios) => this.usuarios = usuarios)
      }
    })
  }

  cargarEmpresa(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empresaService.getEmpresa(id).subscribe((empresa) => this.empresa = empresa)
      }
    })
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/dto/usuario';
import { UsuarioService } from '../../../models/services/usuario.service';
import { AuthService } from 'src/app/models/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarios!: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    public router: Router, 
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private authService: AuthService) {
      this.title.setTitle("Usuarios | Información Gerencial - Nómina");
    }
   

  ngOnInit(): void {
   this.cargarUsuarios();
  }

  cargarUsuarios(){
    let rfc = this.authService.usuario.empresa;
    this.usuarioService.getUsuarios(rfc).subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    )
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

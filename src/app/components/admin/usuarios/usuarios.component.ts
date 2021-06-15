import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/dto/usuario';
import { Empresa } from '../../../models/dto/empresa';
import { UsuarioService } from '../../../models/services/usuario.service';
import { EmpresaService } from '../../../models/services/empresa.service';
import { AuthService } from 'src/app/models/services/auth.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  rfc!: any;

  empresas!:Empresa[];
  public empresa: Empresa = new Empresa();

  usuarios!: Usuario[];
  public usuario: Usuario = new Usuario();
 
  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService, 
    public router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
      this.activatedRoute.params.subscribe(params => {
        let rfcUrl = params['id'];
        this.rfc = rfcUrl;
    });
   }

  ngOnInit(): void {
    var rfcUsuario: any = this.authService.usuario.empresa;
    var authorities: any = this.authService.usuario.roles;
   if(rfcUsuario == this.rfc || (rfcUsuario == "DCO821008122"  && authorities == "ROLE_ADMIN" )){
     this.cargarUsuarios(this.rfc);
     this.cargarEmpresa(this.rfc);
   }else{
     Swal.fire('Error', 'error', 'error' );
   }
    
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

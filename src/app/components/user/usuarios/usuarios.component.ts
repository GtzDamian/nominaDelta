import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/dto/usuario';
import { UsuarioService } from '../../../models/services/usuario.service';
import { AuthService } from 'src/app/models/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    public router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
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

}

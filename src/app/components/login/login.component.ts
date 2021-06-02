import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/dto/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../models/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:String = " Sistema de Información Gerencial - Nómina";
  usuario!: Usuario;
  role: string = "ROLE_ADMIN";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
   }

  ngOnInit(){
    if(this.authService.isAuthenticated()){
      Swal.fire('Bienvenido', `${this.authService.usuario.username} ya estás autenticado`, 'info');
      if(this.authService.hasRole(this.role) == true){
        this.router.navigate(['/sig/admin']);
        Swal.fire('Bienvenido', `${this.authService.usuario.username}`, 'success');
        
      }else{
        this.router.navigate(['/sig/home/', this.authService.usuario.empresa]);
      }
    }
  }

  login(): void{
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Username o password vacías', 'error');
    }

    this.authService.login(this.usuario).subscribe(
      response => { 
    
        let usuario = this.authService.usuario;
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        if(this.authService.hasRole(this.role) == true){
          console.log(this.authService.usuario.empresa);
          this.router.navigate(['/sig/admin']);
          Swal.fire('Bienvenido', `${this.authService.usuario.username}`, 'success');
        }else{
          this.router.navigate(['/sig/home/', this.authService.usuario.empresa]);
        }
      }, err =>{
        if(err.status == 400){
          Swal.fire('Error Login', 'Usuario o contraseña incorrectos', 'error');
        }
      }
    )
  }
}

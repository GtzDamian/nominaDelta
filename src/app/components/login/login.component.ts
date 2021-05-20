import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/dto/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../models/services/auth.service';
import { Router, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:String = " Sistema de Información Gerencial - Nómina";
  usuario!: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }

  login(): void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Username o password vacías', 'error');
    }

    this.authService.login(this.usuario).subscribe(
      response => { 
        console.log(response);
        this.router.navigate(['/sig/admin']);
        Swal.fire('Bienvenido', this.usuario.username, 'success');
      } 
    )
  }
}

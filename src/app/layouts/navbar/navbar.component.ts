import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/models/services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Empresa } from 'src/app/models/dto/empresa';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    swal.fire({
      title: 'Log Out',
      text: "¿Desea cerrar la sesión actual?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3c5d77',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        swal.fire(
          'Sesión cerrada',
          'Gracias por usar el Sistema de Información Gerencial',
          'success'
        )
        this.router.navigate(['/sig/login']);
      }
    })
  }
}

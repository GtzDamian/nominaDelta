import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/dto/usuario'; 
import { UsuarioService } from 'src/app/models/services/usuario.service';
import { AuthService } from 'src/app/models/services/auth.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuariosForm.component.html',
  styleUrls: ['./usuariosForm.component.css']
})
export class UsuariosFormComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    public authService: AuthService,
    public usuarioService: UsuarioService,
    public router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) { 
    this.title.setTitle("Usuarios | Información Gerencial - Nómina")
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['idUsr']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    });
  }

  public create():void{
    this.activatedRoute.params.subscribe(params => {
      var id:any = params['id'];
      if(id){
        this.usuarioService.create(this.usuario, id).subscribe(usuario => {
          Swal.fire('Registro exitoso', this.usuario.username + ' registrado correctamente', 'success');
          this.router.navigate(['/sig/home/' + this.authService.usuario.empresa + '/usuarios'])
        })
      }
    })
  }

  public update(): void{
    this.activatedRoute.params.subscribe(params => {
      var id:number = params['idUsr'];
      if(id){
        if(this.usuario.username == null || this.usuario.username == '' || this.usuario.nombre ==  null || this.usuario.nombre == '' || this.usuario.apellido == null || this.usuario.apellido == '' || this.usuario.password == null || this.usuario.password == ''){
          Swal.fire('Error', 'Error al editar usuario.', 'error' )
        }else{
          this.usuarioService.update(this.usuario).subscribe(usuario => {
            Swal.fire('Actualización exitosa', 'El usuario se ha actualizado correctamente', 'success')
            this.router.navigate(['/sig/home/' + this.authService.usuario.empresa + '/usuarios'])
          })
        }
      }
    })
  }

}

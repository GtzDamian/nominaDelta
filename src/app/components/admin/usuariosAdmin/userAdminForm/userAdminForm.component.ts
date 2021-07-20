import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/dto/usuario';
import { UsuarioService } from '../../../../models/services/usuario.service';
import {Router, Routes, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-userForm',
  templateUrl: './userAdminForm.component.html',
  styleUrls: ['./userAdminForm.component.css']
})
export class UserAdminFormComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor( 
    private usuarioService: UsuarioService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private title: Title) {
      this.title.setTitle("Usuarios | Información Gerencial - Nómina")
     }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id_usr']
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
          this.router.navigate(['/sig/admin/usuarios/empresa/' + id])
        })
      }
    })
  }

  public update(): void{
    this.activatedRoute.params.subscribe(params => {
      var id:number = params['id'];
      if(id){
        if(this.usuario.username == null || this.usuario.username == '' || this.usuario.nombre ==  null || this.usuario.nombre == '' || this.usuario.apellido == null || this.usuario.apellido == '' || this.usuario.password == null || this.usuario.password == ''){
          Swal.fire('Error', 'Error al editar usuario', 'error' )
        }else{
          this.usuarioService.update(this.usuario).subscribe(usuario => {
            Swal.fire('Actualización exitosa', 'El usuario se ha actualizado correctamente', 'success')
            this.router.navigate(['/sig/admin/usuarios/empresa/' + id])
          })
        }
      }
    })
  }

  public back():void{
    this.location.back();
  }
}

  
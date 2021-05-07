import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/dto/usuario';
import { UsuarioService } from '../../../../models/services/usuario.service';
import {Router, Routes, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css']
})
export class UserFormComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor( 
    private usuarioService: UsuarioService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id_usr']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  public create():void{
    this.activatedRoute.params.subscribe(params => {
      var id:number = params['id'];
      if(id){
        this.usuarioService.create(this.usuario, id).subscribe(usuario => {
          this.router.navigate(['/admin/usuarios/empresa/' + id])
        })
      }
    })
  }

  public update(): void{
    this.activatedRoute.params.subscribe(params => {
      var id:number = params['id'];
      if(id){
        this.usuarioService.update(this.usuario).subscribe(usuario => {
          this.router.navigate(['/admin/usuarios/empresa/' + id])
        })
      }
    })
  }

  public back():void{
    this.activatedRoute.params.subscribe(params => {
      var id:number = params['id'];
      if(id){
        this.router.navigate(['/admin/usuarios/empresa/' + id])
      }
    })
  }
}

  
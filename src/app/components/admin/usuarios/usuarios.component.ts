import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Usuario } from '../../../models/dto/usuario';
import { UsuarioService } from '../../../models/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios!: Usuario[];
  public usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuarios(id).subscribe( (usuarios) => this.usuarios = usuarios)
      }
    })
  }


}

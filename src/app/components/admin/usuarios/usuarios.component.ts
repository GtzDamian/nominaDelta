import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Usuario } from '../../../models/dto/usuario';
import { Empresa } from '../../../models/dto/empresa';
import { UsuarioService } from '../../../models/services/usuario.service';
import { EmpresaService } from '../../../models/services/empresa.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  empresas!:Empresa[];
  public empresa: Empresa = new Empresa();

  usuarios!: Usuario[];
  public usuario: Usuario = new Usuario();
 
  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarEmpresa();
    
  }

  cargarUsuarios(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuarios(id).subscribe( (usuarios) => this.usuarios = usuarios)
      }
    })
  }

  cargarEmpresa(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empresaService.getEmpresa(id).subscribe((empresa) => this.empresa = empresa)
      }
    })
  }
}

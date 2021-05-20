import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/dto/empresa';
import { EmpresaService } from '../../../../models/services/empresa.service';
import {Router, Routes, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-empForm',
  templateUrl: './empForm.component.html',
  styleUrls: ['./empForm.component.css']
})
export class EmpFormComponent implements OnInit {

  public empresa: Empresa = new Empresa();

  constructor(
    private empresaService: EmpresaService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.cargarEmpresa();
  }

  public create():void{
    this.empresaService.create(this.empresa).subscribe(empresa => {
      this.router.navigate(['/sig/admin'])
    })
  }

  cargarEmpresa(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empresaService.getEmpresa(id).subscribe( (empresa) => this.empresa = empresa)
      }
    })
  }

  public update(): void{
    this.empresaService.update(this.empresa).subscribe(empresa =>
      {this.router.navigate(['/sig/admin'])
    })
  }
}
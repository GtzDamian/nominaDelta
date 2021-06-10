import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/dto/empresa';
import { EmpresaService } from '../../../../models/services/empresa.service';
import {Router, Routes, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empForm',
  templateUrl: './empForm.component.html',
  styleUrls: ['./empForm.component.css']
})
export class EmpFormComponent implements OnInit {

  public empresa: Empresa = new Empresa();
  public rfcExists!: boolean;

  constructor(
    private empresaService: EmpresaService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    
    
  ngOnInit(): void {
    this.cargarEmpresa();

   this.rfcCheck();
  }

  public rfcCheck(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id != null ){
        this.rfcExists = true;
      }else{
        this.rfcExists = false;
      }
  });
  }

  public create():void{
    this.empresaService.create(this.empresa).subscribe(empresa => {
      Swal.fire('Registro exitoso', this.empresa.razonSocial + ' registrada correctamente', 'success');
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
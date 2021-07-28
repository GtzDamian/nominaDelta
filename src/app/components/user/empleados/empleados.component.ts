import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/dto/empleado';
import { AuthService } from 'src/app/models/services/auth.service';
import { EmpleadoService } from 'src/app/models/services/empleado.service';
import { Departamento } from 'src/app/models/dto/departamento';
import { DepartamentoService } from 'src/app/models/services/departamento.service'; 
import { Puesto } from 'src/app/models/dto/puesto';
import { PuestoService } from 'src/app/models/services/puesto.service';
import { Empresa } from 'src/app/models/dto/empresa';
import { EmpresaService } from 'src/app/models/services/empresa.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  rfc!: string;
  empleado: Empleado = new Empleado();
  empleados!: Empleado[]; 
  departamentos!: Departamento[];
  puestos!: Puesto[];
  empresa: Empresa = new Empresa();
  registrosTotales!: number;
  blob!: Blob;


  constructor(
    private empleadoService: EmpleadoService,
    private departamentoservice: DepartamentoService,
    private puestoService: PuestoService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private activatedRoute: ActivatedRoute) { 
      this.title.setTitle("Empleados | Información Gerencial - Nómina");
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.rfc = id;
      if(id){
        this.empleadoService.getEmpleados(id).subscribe(
          (empleados) => {
            this.empleados = empleados;
            this.registrosTotales = empleados.length;
          }
        )
      }
    })

    this.selectDeptos();
    this.selectPuestos();
    this.cargarEmpresa();
  }

  selectDeptos(){
    if(this.rfc){
      this.departamentoservice.selectDepartamentos(this.rfc).subscribe(
        (departamentos) =>{
          this.departamentos = departamentos;
        }
      )
    }
  }

  selectPuestos(){
    if(this.rfc){
      this.puestoService.selectPuestos(this.rfc).subscribe(
        (puestos) =>{
          this.puestos = puestos;
        }
      )
    }
  }

  cargarEmpresa(){
    if(this.rfc){
      this.empresaService.getEmpresaByRfc(this.rfc).subscribe(
        (empresa)=>{
          this.empresa = empresa;
        }
      )
    }
  }

    filtro(){
      if(this.rfc){
        this.empleadoService.getEmpleadosFiltro(this.rfc, this.empleado.empleado, this.empleado.nombre, this.empleado.departamento, this.empleado.puesto).subscribe(
          (empleados) => {
            this.empleados = empleados
            this.registrosTotales = empleados.length;
          }
        )
      }
    }

    exportPdf(){
      let fecha = new Date();
      let options ={ year: 'numeric', month: 'long', day: 'numeric'} as const;
        
      if(this.rfc){
        this.empleadoService.exportPdf(this.rfc, this.empleado.empleado, this.empleado.nombre, this.empleado.departamento,this.empleado.puesto, this.empresa.razonSocial, this.registrosTotales).subscribe(
          (data) =>{
            this.blob = new Blob([data], {type: 'application/pdf'});
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "Reporte de Empleados al " + fecha.toLocaleDateString('es-MX', options) + ".pdf";
            link.click();
          }
        );
      }
    }

    exportExcel(){
      let fecha = new Date();
      let options ={ year: 'numeric', month: 'long', day: 'numeric'} as const;
        
      if(this.rfc){
        this.empleadoService.exportExcel(this.rfc, this.empleado.empleado, this.empleado.nombre, this.empleado.departamento,this.empleado.puesto, this.empresa.razonSocial, this.registrosTotales).subscribe(
          (data) =>{
            this.blob = new Blob([data], {type: 'application/octet-stream'});
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "Reporte de Empleados al " + fecha.toLocaleDateString('es-MX', options) + ".xlsx";
            link.click();
          }
        );
      }
    }

}

 


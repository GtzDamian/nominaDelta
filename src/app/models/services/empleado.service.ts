import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Empleado } from '../dto/empleado';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndpoint: string = "http://localhost:8090/servicio-empresas/empleados";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getEmpleados(id: string):Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.urlEndpoint + "/" + id);
  }

  getEmpleadosFiltro(id: string, empleado: any, nombre: any, departamento: any, puesto: any): Observable<Empleado[]>{
    if(empleado == undefined){
      empleado = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
    if(departamento == undefined){
      departamento = "";
    }  
    if(puesto == undefined){
     puesto = "";
    }

    return this.http.get<Empleado[]>(this.urlEndpoint + "/" + id + "/filtro?empleado=" + empleado + "&nombre=" + nombre + "&departamento=" + departamento + "&puesto=" + puesto);
  }

  exportPdf(id: string, empleado: any, nombre: any, departamento: any, puesto: any, razonSocial: any, registrosTotales: number):Observable<any>{
    if(empleado == undefined){
      empleado = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
    if(departamento == undefined){
      departamento = "";
    }  
    if(puesto == undefined){
     puesto = "";
    }
  
    return this.http.get<any>(this.urlEndpoint + "/" + id + "/pdf?empleado=" + empleado + "&nombre=" + nombre + "&departamento=" + departamento + "&puesto=" + puesto + "&razonSocial=" + razonSocial + "&registrosTotales=" + registrosTotales, {responseType: 'blob' as 'json'});
  }

  exportExcel(id: string, empleado: any, nombre: any, departamento: any, puesto: any, razonSocial: any, registrosTotales: number):Observable<any>{
    if(empleado == undefined){
      empleado = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
    if(departamento == undefined){
      departamento = "";
    }  
    if(puesto == undefined){
     puesto = "";
    }
  
    return this.http.get<any>(this.urlEndpoint + "/" + id + "/excel?empleado=" + empleado + "&nombre=" + nombre + "&departamento=" + departamento + "&puesto=" + puesto + "&razonSocial=" + razonSocial + "&registrosTotales=" + registrosTotales, {responseType: 'blob' as 'json'});
  }
}
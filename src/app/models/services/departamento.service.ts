import { Injectable } from '@angular/core';
import { Departamento } from '../dto/departamento';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private urlEndpoint: string = "http://localhost:8090/servicio-empresas/departamentos";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getDepartamentos(id: string):Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.urlEndpoint + "/" + id);
  }

  getDepartamentosFiltro(id: string, departamento: any, nombre: any): Observable<Departamento[]>{
    if(departamento == undefined){
      departamento = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
  
    let params:any = new URLSearchParams();
    params.append("departamentpo", departamento);
    params.append("nombre", nombre);
    return this.http.get<Departamento[]>(this.urlEndpoint + "/" + id + "/buscar/?departamento=" + departamento + "&nombre=" + nombre);
  }
}

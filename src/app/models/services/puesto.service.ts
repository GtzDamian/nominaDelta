import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Puesto } from '../dto/puesto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private urlEndpoint: string = "http://localhost:8090/servicio-empresas/puestos"

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getPuestos(id: string):Observable<Puesto[]>{
    return this.http.get<Puesto[]>(this.urlEndpoint + "/" + id);
  }

  getPuestosFiltro(id: string, puesto: any, nombre: any): Observable<Puesto[]>{
    if(puesto == undefined){
      puesto = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
  
    let params:any = new URLSearchParams();
    params.append("puesto", puesto);
    params.append("nombre", nombre);
    return this.http.get<Puesto[]>(this.urlEndpoint + "/" + id + "/buscar/?puesto=" + puesto + "&nombre=" + nombre);
  }
}

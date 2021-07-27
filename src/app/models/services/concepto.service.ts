import { Injectable } from '@angular/core';
import { Concepto } from '../dto/concepto';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService} from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  private urlEndpoint: string = "http://localhost:8090/servicio-empresas/conceptos";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getConceptos(id: string):Observable<Concepto[]>{
    return this.http.get<Concepto[]>(this.urlEndpoint + "/" + id);
  }

  exportPdf(id: string, concepto: any, nombre: any, razonSocial: any, registrosTotales: number):Observable<any>{
    if(concepto == undefined){
      concepto = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }

    return this.http.get<any>(this.urlEndpoint + "/" + id + "/pdf?concepto=" + concepto + "&nombre=" + nombre + "&razonSocial=" + razonSocial + "&registrosTotales=" + registrosTotales, {responseType: 'blob' as 'json'});
  }

  exportExcel(id: string, concepto: any, nombre: any, razonSocial: any, registrosTotales: number):Observable<any>{
    if(concepto == undefined){
      concepto = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
  
    return this.http.get<any>(this.urlEndpoint + "/" + id + "/excel?concepto=" + concepto + "&nombre=" + nombre + "&razonSocial=" + razonSocial + "&registrosTotales=" + registrosTotales, {responseType: 'blob' as 'json'});
  }
   
  getConceptosFiltro(id: string, concepto: any, nombre: any): Observable<Concepto[]>{
    if(concepto == undefined){
      concepto = "";
    }  
    if(nombre == undefined){
     nombre = "";
    }
  
    return this.http.get<Concepto[]>(this.urlEndpoint + "/" + id + "/buscar/?concepto=" + concepto + "&nombre=" + nombre);
  }
  
}
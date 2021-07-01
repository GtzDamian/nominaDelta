import { Injectable } from '@angular/core';
import { Concepto } from '../dto/concepto';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Route, Router} from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService} from './auth.service';
import swal from 'sweetalert2';
import { Identifiers } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  private urlEndpoint: string = "http://localhost:8090/servicio-empresas/conceptos"

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getConceptos(id: string):Observable<Concepto[]>{
    return this.http.get<Concepto[]>(this.urlEndpoint + "/" + id);
  }

  getConceptosFiltro(id: string, concepto: String, nombre: string): Observable<Concepto[]>{
    let params:any = new URLSearchParams();
    params.append("concepto", concepto);
    params.append("nombre", nombre);
    return this.http.get<Concepto[]>(this.urlEndpoint + "/" + id + "/buscar/?concepto=" + concepto + "&nombre=" + nombre);
  }
}
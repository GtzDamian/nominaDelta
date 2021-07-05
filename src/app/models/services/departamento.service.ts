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

  getConceptos(id: string):Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.urlEndpoint + "/" + id);
  }
}

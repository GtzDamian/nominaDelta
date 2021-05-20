import { Injectable } from '@angular/core';
import { Empresa } from '../dto/empresa';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Route, Router} from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class EmpresaService {

  private urlEndPoint: string = " http://localhost:8090/servicio-empresas/empresas";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  private authorized(e:any): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/sig/login']);
      return true;
    }
    return false; 
  }

  getEmpresas(): Observable<Empresa[]>{
    //Convierte el Json de respuesta en un tipo de la clase Empresa
    return this.http.get<Empresa[]>(this.urlEndPoint).pipe(
      catchError(e => {
        this.authorized(e);
        return throwError(e);
      })
    );
  }

  create(empresa: Empresa):Observable<Empresa[]>{
    return this.http.post<Empresa[]>(this.urlEndPoint, empresa, {headers: this.httpHeaders})
  }

  getEmpresa(id:number): Observable<Empresa>{
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}`);
  }

  update(empresa: Empresa): Observable<Empresa>{
    return this.http.put<Empresa>(`${this.urlEndPoint}/${empresa.id}`, empresa , {headers: this.httpHeaders})
  }

  delete(id:  number):  Observable<Empresa>{
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}

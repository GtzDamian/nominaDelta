import { Injectable } from '@angular/core';
import { Empresa } from '../dto/empresa';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Route, Router} from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService} from './auth.service';
import swal from 'sweetalert2';

@Injectable()
export class EmpresaService {

  private urlEndPoint: string = " http://localhost:8090/servicio-empresas/empresas";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService) { }

  private authorized(e:any): boolean{
    if(this.authService.isAuthenticated()){
      this.authService.logout();
    }
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

  getEmpresaByRfc(rfc: any):Observable<Empresa>{
    return this.http.get<Empresa>(this.urlEndPoint + "/rfc/" + rfc );
  }

  create(empresa: Empresa):Observable<Empresa[]>{
    return this.http.post<Empresa[]>(this.urlEndPoint, empresa).pipe(
     catchError(e => {
      if(e.status == 500){
        swal.fire( e.error.mensaje,'Verifique campos vacíos y RFC duplicado', 'error');
      }
      return throwError(e);
     })

    )
  }

  getEmpresa(id:number): Observable<Empresa>{
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}` );
  }

  update(empresa: Empresa): Observable<Empresa>{
    return this.http.put<Empresa>(`${this.urlEndPoint}/${empresa.rfc}`, empresa ).pipe(
      catchError(e => {
       if(e.status == 500){
         swal.fire( e.error.mensaje,'Verifique campos vacíos y RFC duplicado', 'error');
       }
       return throwError(e);
      })
 
     )
  }

  delete(id:  string):  Observable<Empresa>{
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}`);
  }
}

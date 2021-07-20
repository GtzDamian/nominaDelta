import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Division } from '../dto/division';
import { AuthService } from './auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private urlEndpoint: string = "http://localhost:8090/servicio-divisiones/divisiones";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getDivisiones(id: string):Observable<Division[]>{
    return this.http.get<Division[]>(this.urlEndpoint + "/" + id);
  }

  getDivision(id: any): Observable<Division>{
    return this.http.get<Division>(this.urlEndpoint + "/division/" + id);
  }

  getDivisionesConsulta(id: string):Observable<Division[]>{
    return this.http.get<Division[]>(this.urlEndpoint + "/consulta/" + id);
  }

  create(division: Division, id: any):Observable<Division[]>{
    return this.http.post<Division[]>(this.urlEndpoint + "/" + id + "/division", division).pipe(
     catchError(e => {
      if(e.status == 500){
        swal.fire( e.error.mensaje,'Verifique campos vacíos y División duplicada', 'error');
      }
      return throwError(e);
     })

    )
  }

  update(division: Division): Observable<Division>{
    return this.http.put<Division>(this.urlEndpoint+ '/division/' + division.id , division , {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 500){
          swal.fire(e.error.mensaje, 'Verifique campos vacíos y División duplicada', 'error');
        }
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Division>{
    return this.http.delete<Division>(this.urlEndpoint + '/' + id)
  }
}

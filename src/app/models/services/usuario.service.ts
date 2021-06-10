import { Injectable } from '@angular/core';
import { Usuario } from '../dto/usuario';
import { of, Observable, throwError } from 'rxjs';
import {Router, Routes, ActivatedRoute} from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService} from './auth.service';
import swal from 'sweetalert2';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsuarioService {
  
  private urlEndPoint: string = "http://localhost:8090/servicio-usuarios/usuarios";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getUsuarios(id: any): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint + '/empresa/' + id ).pipe(
     catchError(e => {
       if(e.status == 404){
         swal.fire('Sin Datos', e.error.mensaje, 'info' );
       }
       return throwError(e);
     })
 
     )
  }

  getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.urlEndPoint + '/' + id );
  }

  create(usuario: Usuario, id: number): Observable<Usuario[]>{
    return this.http.post<Usuario[]>(this.urlEndPoint + '/empresa/' + id, usuario, {headers: this.httpHeaders})
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.urlEndPoint + '/' + usuario.id , usuario , {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(this.urlEndPoint + '/' + id)
  }
 


}

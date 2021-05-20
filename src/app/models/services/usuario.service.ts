import { Injectable } from '@angular/core';
import { Usuario } from '../dto/usuario';
import { of, Observable } from 'rxjs';
import {Router, Routes, ActivatedRoute} from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsuarioService {
  
  private urlEndPoint: string = "http://localhost:8090/servicio-usuarios/usuarios";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getUsuarios(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint + '/empresa/' + id );
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

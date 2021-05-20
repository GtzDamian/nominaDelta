import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../dto/usuario';

@Injectable()
export class AuthService {

  
  
  constructor(
    private http: HttpClient,
  ) { }

  login(usuario: Usuario): Observable<any>{
    const urlEndpoint = 'http://localhost:8090/servicio-oauth/oauth/token';
    const credenciales = btoa('nominaDelta' + ':' + 'deltapass');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+credenciales});
      let params = new URLSearchParams();
      params.set('grant_type','password');
      params.set('username', usuario.username);
      params.set('password', usuario.password);
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders})
  }
}

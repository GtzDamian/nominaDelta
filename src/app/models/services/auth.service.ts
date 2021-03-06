import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../dto/usuario';

@Injectable()
export class AuthService {

  private _usuario!: Usuario;
  private _token!: string;
  
  constructor(
    private http: HttpClient,
  ) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario; 
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token')!; 
      return this._token;
    }
    return null!;
  }

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

  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.empresa = payload.empresa.rfc;
    this._usuario.roles = payload.authorities;

    this._usuario.tConceptos = payload.tConceptos;
    this._usuario.tDepartamentos = payload.tConceptos;
    this._usuario.tPuestos = payload.tPuestos;
    this._usuario.tEmpleados = payload.tEmpleados;
    this._usuario.tDivisiones = payload.tDivisiones;
    this._usuario.tUsuarios = payload.tUsuarios;
    this._usuario.tDatosGenerales = payload.tDatosGenerales;

    this._usuario.cPorDivision = payload.cPorDivision;
    this._usuario.cPorConcepto = payload.cPorConcepto;
    this._usuario.cPorEmpleado = payload.cPorEmpleado;
    this._usuario.cDeEmpleado = payload.cDeEmpleado;

    this._usuario.eExcel = payload.eExcel;
    this._usuario.ePdf = payload.ePdf;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }

    return false;
  }

  logout():void{
    this._token = null!;
    this._usuario = null!;
    sessionStorage.clear();
  }

  hasRole(role: any): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
}

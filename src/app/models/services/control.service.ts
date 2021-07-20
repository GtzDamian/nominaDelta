import { Injectable } from '@angular/core';
import { Control } from '../dto/control';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  private urlEndpoint: string = "http://localhost:8090/servicio-empresas/control";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getDatos(id: string):Observable<Control>{
    return this.http.get<Control>(this.urlEndpoint + "/" + id);
  }

  
}

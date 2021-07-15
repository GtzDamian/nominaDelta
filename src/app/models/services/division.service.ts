import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Division } from '../dto/division';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private urlEndpoint: string = "http://localhost:8090/servicio-divisiones/divisiones";

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  getDivisiones(id: string):Observable<Division[]>{
    return this.http.get<Division[]>(this.urlEndpoint + "/" + id);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/sig/login/']);
      return false;
    }

    let role = route.data['role'] as string;
    if(this.authService.hasRole(role)){
      return true;
    }
    swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`)
    this.router.navigate(['..']);
    return false;
  }
  
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpFormComponent } from './components/admin/empresas/empForm/empForm.component';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { UserFormComponent } from './components/admin/usuarios/userForm/userForm.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ConceptoComponent } from './components/user/concepto/concepto.component';
import { DepartamentosComponent } from './components/user/departamentos/departamentos.component';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { AuthGuard } from './models/guards/auth.guard';
import { RoleGuard } from './models/guards/role.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sig/login', component: LoginComponent},
  {path: 'sig/admin', component: EmpresasComponent, canActivate: [AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'sig/admin/empresas', component: EmpFormComponent},
  {path: 'sig/admin/empresas/:id', component: EmpFormComponent},
  {path: 'sig/admin/usuarios/empresa/:id', component: UsuariosComponent},
  {path: 'sig/admin/usuarios/empresa/:id/usuario', component: UserFormComponent},
  {path: 'sig/admin/usuarios/empresa/:id/usuario/:id_usr', component: UserFormComponent},
  {path: 'sig/home/:id', component: InicioComponent},
  {path: 'sig/home/:id/conceptos', component: ConceptoComponent},
  {path: 'sig/home/:id/departamentos', component: DepartamentosComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

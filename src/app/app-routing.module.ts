import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpFormComponent } from './components/admin/empresas/empForm/empForm.component';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { UserAdminFormComponent } from './components/admin/usuariosAdmin/userAdminForm/userAdminForm.component';
import { UsuariosAdminComponent } from './components/admin/usuariosAdmin/usuariosAdmin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ConceptoComponent } from './components/user/concepto/concepto.component';
import { DepartamentosComponent } from './components/user/departamentos/departamentos.component';
import { DivisionesFormComponent } from './components/user/divisiones/divisionesForm/divisionesForm.component';
import { DivisionesComponent } from './components/user/divisiones/divisiones.component';
import { EmpleadosComponent } from './components/user/empleados/empleados.component';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { PuestosComponent } from './components/user/puestos/puestos.component';
import { AuthGuard } from './models/guards/auth.guard';
import { RoleGuard } from './models/guards/role.guard';
import { UsuariosComponent } from './components/user/usuarios/usuarios.component';
import { UsuariosFormComponent } from './components/user/usuarios/usuariosForm/usuariosForm.component';
import { GeneralesComponent } from './components/user/generales/generales.component';
import { CPorDivisionComponent } from './components/user/cPorDivision/cPorDivision.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sig/login', component: LoginComponent},
  {path: 'sig/admin', component: EmpresasComponent, canActivate: [AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'sig/admin/empresas', component: EmpFormComponent},
  {path: 'sig/admin/empresas/:id', component: EmpFormComponent},
  {path: 'sig/admin/usuarios/empresa/:id', component: UsuariosAdminComponent},
  {path: 'sig/admin/usuarios/empresa/:id/usuario', component: UserAdminFormComponent},
  {path: 'sig/admin/usuarios/empresa/:id/usuario/:id_usr', component: UserAdminFormComponent},
  {path: 'sig/home/:id', component: InicioComponent},
  {path: 'sig/home/:id/conceptos', component: ConceptoComponent},
  {path: 'sig/home/:id/departamentos', component: DepartamentosComponent},
  {path: 'sig/home/:id/puestos', component: PuestosComponent},
  {path: 'sig/home/:id/empleados', component: EmpleadosComponent},
  {path: 'sig/home/:id/divisiones', component: DivisionesComponent},
  {path: 'sig/home/:id/divisiones/division', component: DivisionesFormComponent},
  {path: 'sig/home/:id/divisiones/division/:divId', component: DivisionesFormComponent},
  {path: 'sig/home/:id/usuarios', component: UsuariosComponent},
  {path: 'sig/home/:id/usuarios/usuario', component: UsuariosFormComponent},
  {path: 'sig/home/:id/usuarios/usuario/:idUsr', component: UsuariosFormComponent},
  {path: 'sig/home/:id/datos-generales', component: GeneralesComponent},
  {path: 'sig/home/:id/por-division', component: CPorDivisionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

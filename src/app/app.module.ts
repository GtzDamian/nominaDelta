import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { UsuariosAdminComponent } from './components/admin/usuariosAdmin/usuariosAdmin.component';
import { EmpFormComponent } from './components/admin/empresas/empForm/empForm.component';

import { EmpresaService } from './models/services/empresa.service';
import { UsuarioService } from './models/services/usuario.service';
import { UserAdminFormComponent } from './components/admin/usuariosAdmin/userAdminForm/userAdminForm.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './models/services/auth.service';

import { TokenInterceptor } from './models/interceptors/token.interceptor';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { ConceptoComponent } from './components/user/concepto/concepto.component';
import { DepartamentosComponent } from './components/user/departamentos/departamentos.component';
import { PuestosComponent } from './components/user/puestos/puestos.component';
import { EmpleadosComponent } from './components/user/empleados/empleados.component';
import { DivisionesComponent } from './components/user/divisiones/divisiones.component';
import { DivisionesFormComponent } from './components/user/divisiones/divisionesForm/divisionesForm.component';
import { UsuariosComponent } from './components/user/usuarios/usuarios.component';
import { UsuariosFormComponent } from './components/user/usuarios/usuariosForm/usuariosForm.component';
import { GeneralesComponent } from './components/user/generales/generales.component';
import { CPorDivisionComponent } from './components/user/cPorDivision/cPorDivision.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    EmpresasComponent,
    UsuariosAdminComponent,
    EmpFormComponent,
    UserAdminFormComponent,
    LoginComponent,
    HomeComponent,
    InicioComponent,
    ConceptoComponent,
    DepartamentosComponent,
    PuestosComponent,
    EmpleadosComponent,
    DivisionesComponent,
    DivisionesFormComponent,
    UsuariosComponent,
    UsuariosFormComponent,
    GeneralesComponent,
    CPorDivisionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmpresaService,
    UsuarioService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

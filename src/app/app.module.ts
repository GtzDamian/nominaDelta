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
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { EmpFormComponent } from './components/admin/empresas/empForm/empForm.component';

import { EmpresaService } from './models/services/empresa.service';
import { UsuarioService } from './models/services/usuario.service';
import { UserFormComponent } from './components/admin/usuarios/userForm/userForm.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './models/services/auth.service';

import { TokenInterceptor } from './models/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    EmpresasComponent,
    UsuariosComponent,
    EmpFormComponent,
    UserFormComponent,
    LoginComponent,
    HomeComponent
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

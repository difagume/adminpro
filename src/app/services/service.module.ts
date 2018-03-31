import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuard, SubirArchivoService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    UsuarioService,
    SidebarService,
    SubirArchivoService,
    LoginGuard
  ]
})
export class ServiceModule { }

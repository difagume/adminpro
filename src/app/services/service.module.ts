import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGuard,
  SubirArchivoService,
  HospitalService
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

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
    LoginGuard,
    ModalUploadService,
    HospitalService
  ]
})
export class ServiceModule { }

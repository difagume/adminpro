import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../service.index';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  canActivate() {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true; // quiere decir que si puede activar esa ruta
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      // this._usuarioService.logout();
      return false;
    }
  }
}

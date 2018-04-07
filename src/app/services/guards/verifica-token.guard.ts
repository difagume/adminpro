import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard');

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    // console.log(payload);

    let expirado = this.tokenExpirado(payload.exp);


    return true;
  }

  tokenExpirado(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true; // token ya expirado
    } else {
      return false;
    }
  }
}

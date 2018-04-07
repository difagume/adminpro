import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard');

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    // console.log(payload);

    let expirado = this.tokenExpirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenuevaToken(payload.exp);
  }

  verificaRenuevaToken(fechaExp: number): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000)); // incrementa 1 horas

      console.log('TokenExp: ', tokenExp);
      console.log('fecha actual + 4h: ', ahora);

      if (tokenExp.getTime() > ahora.getTime()) { // significa que le falta mas de 4horas para q expire el token
        resolve(true);
      } else { // el token está proximo a expirar, entonces lo renueva
        this._usuarioService.renuevaToken()
          .subscribe(() => {

            resolve(true);

          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }
    });
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { NgZone } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';

// Hace la llamada a cualquier script fuera de angular que se encuetre en un js
declare function init_plugins();
// declare const gapi: any; // Google

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame = false;
  // auth2: any; // The Sign-In object.

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone,
    private socialAuthService: AuthService
  ) { }

  ngOnInit() {
    init_plugins();
    // this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  /* googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '458229930749-sr6sma82ppdcr8546mn3qtilsuqbb7a7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  } */

  /* attachSignin(element) {
    // Gestionar inicios de sesión exitosos
    const onSuccess = (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      // Ejecutamos dentro de una zona
      this.zone.run(() => {
        this._usuarioService.loginGoogle(token)
          .subscribe(() => {
            // console.log('Logueado como ' + googleUser.getBasicProfile().getName());
            this._usuarioService.auth2 = this.auth2;
            this.router.navigate(['/dashboard']);
          });
        // .subscribe(() => window.location.href = '#/dashboard');
      });
    };

    // Manejar fallas de inicio de sesión
    const onFailure = function (error) {
      console.log(error);
    };

    // Realiza la autenticación
    this.auth2.attachClickHandler(element, {}, onSuccess, onFailure);
  } */

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // console.log(socialPlatform + ' sign in data : ', userData);

        if (socialPlatform === 'facebook') {
          const token = userData.token;
          this.zone.run(() => {
            this._usuarioService.verificaTokenFacebook(token)
              .subscribe(valido => {
                if (valido) {
                  this._usuarioService.loginFacebook(userData)
                    .subscribe(() => {
                      this.router.navigate(['/dashboard']);
                    });
                }
              });
          });

        } else if (socialPlatform === 'google') {
          const token = userData.idToken;
          // Ejecutamos dentro de una zona
          this.zone.run(() => {
            this._usuarioService.loginGoogle(token)
              .subscribe(() => {
                // console.log('Logueado como ' + googleUser.getBasicProfile().getName());
                // this._usuarioService.auth2 = this.auth2;
                this.router.navigate(['/dashboard']);
              });
            // .subscribe(() => window.location.href = '#/dashboard');
          });
        }
      }
    );
  }

}

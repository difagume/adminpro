import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import idb from 'idb';

declare let swal: any;

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  auth2: any; // The Sign-In object.

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('usuarioService listo');
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
      .map((resp: any) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('Token renovado');

        return true;
      })
      .catch(err => {
        this.router.navigate(['/login']);
        // swal('No se pudo renovar token', err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));

    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    if (this.usuario.google && this.auth2) {
      this.signOutGoogle();
    }
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  signOutGoogle() {
    // this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(() => {
      // console.log('usuario de google desconectado');
    });
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }) // envia el token en forma de objeto
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        // console.log(resp);
        // Creación de IndexeDB hospital
        this.crearIdbHospital();
        return true;
      });
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        // console.log(resp);
        // Creación de IndexeDB hospital
        this.crearIdbHospital();
        return true;
      })
      .catch(err => {
        // swal('Error en el login', err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
      .catch(err => {
        // swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario)
      .map((resp: any) => {

        if (usuario._id === this.usuario._id) {
          const usuarioDB = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      })
      .catch(err => {
        // swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {

        // console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);

      })
      .catch(resp => {
        // console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.usuarios);
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url)
      .map(resp => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  buscarEmail(termino: string) {
    const url = URL_SERVICIOS + '/usuario/email/' + termino;
    return this.http.get(url);
  }

  crearIdbHospital() {
    if (!navigator.serviceWorker) {
      return;
    }
    idb.open('hospitaldb', 1, upgradeDB => {
      let objectStore = upgradeDB.createObjectStore('usuarios', { keyPath: '_id' });
      objectStore.createIndex('por-nombre', 'nombre');

      objectStore = upgradeDB.createObjectStore('hospitales', { keyPath: '_id' });
      objectStore.createIndex('por-nombre', 'nombre');

      objectStore = upgradeDB.createObjectStore('medicos', { keyPath: '_id' });
      objectStore.createIndex('por-nombre', 'nombre');
    }).then(db => console.log('DB opened!'));
  }
}

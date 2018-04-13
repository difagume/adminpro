import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

// import * as swal from 'sweetalert'; // https://github.com/t4t5/sweetalert

// Hace la llamada a cualquier script fuera de angular que se encuetre en un js
declare function init_plugins();

declare let swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email], this.validarEmailDisponible.bind(this)),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }

  // Validadores
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null; // La rega de validación pasa, por eso retorna null
      }

      return {
        sonIguales: true // Si no son iguales retorna true para impedir que el formulario sea válido
      };
    };
  }

  // https://alligator.io/angular/async-validators/
  validarEmailDisponible(control: AbstractControl) {
    return this._usuarioService.buscarEmail(control.value)
      .map((resp: any) => {
        // console.log(resp.ok);
        return resp.ok ? null : { emailNoDisponible: true };
      });
  }

  // Funciones
  registrarUsuario() {
    // Saber si el formulario es valido
    // console.log('Forma válida: ', this.forma.valid);

    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      // console.log('Debe de aceptar las condiciones');
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    // console.log(this.forma.value);
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}

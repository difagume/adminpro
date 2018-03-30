import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Hace la llamada a cualquier script fuera de angular que se encuetre en un js
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

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

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
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

  registrarUsuario() {
    // Saber si el formulario es valido
    // console.log('Forma válida: ', this.forma.valid);

    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      console.log('Debe de aceptar las condiciones');
      return;
    }

    console.log(this.forma.value);
  }

}

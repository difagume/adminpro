import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Hace la llamada a cualquier script fuera de angular que se encuetre en un js
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    this.router.navigate(['/dashboard']);
  }

}

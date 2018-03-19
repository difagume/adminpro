import { Component, OnInit } from '@angular/core';

// Hace la llamada a cualquier script fuera de angular que se encuetre en un js
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}

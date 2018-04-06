import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params
      .subscribe(params => {
        let termino = params['termino'];
        console.log(termino);
      });
  }

  ngOnInit() {
  }

}

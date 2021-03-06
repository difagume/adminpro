import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    // Realizo la búsqueda con el término enviado
    activatedRoute.params
      .subscribe(params => {
        const termino = params['termino'];
        this.buscar(termino);
      });
  }

  ngOnInit() {
  }

  buscar(termino: string) {

    if (!termino) {
      return;
    }

    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;

    this.http.get(url)
      .subscribe((resp: any) => {

        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;

      });
  }

}

import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare let swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _medicoService: MedicoService,
  ) { }

  ngOnInit() {
    // Cargo los médicos
    this.cargarMedicos();
  }

  cargarMedicos() {

    this._medicoService.cargarMedicos(this.desde)
      .subscribe((resp: any) => {

        // console.log(resp);
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
      });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar el ' + medico.nombre,
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
      .then(borrar => {
        // console.log(borrar);
        if (borrar) {

          this._medicoService.borrarMedico(medico._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarMedicos();
            });
        }
      });
  }



  // Paginación
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }

  /* mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  } */

}

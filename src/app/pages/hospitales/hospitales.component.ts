import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { AngularIndexedDB } from 'angular2-indexeddb';

declare let swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    // Cargo los hospitales
    this.cargarHospitales();
    // Me subscribo para recibir cualquier emision del objeto notificacion
    this._modalUploadService.notificacion
      .subscribe((resp: any) => {
        // console.log('resp:', resp);
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;

    // Cargar hospitales desde indexedDB
    let db = new AngularIndexedDB('hospitaldb', 1);
    if (db) {
      db.openDatabase(1).then(() => {

        db.getAll('hospitales').then((resp) => {
          this.hospitales = resp;
          this.totalRegistros = this.hospitales.length;
        }, (error) => {
          console.log(error);
        });
      });
    } else {

      this._hospitalService.cargarHospitales(this.desde)
        .subscribe((resp: any) => {

          // console.log(resp);
          this.totalRegistros = resp.total;
          this.hospitales = resp.hospitales;
          this.cargando = false;

          // Registrar hospitales en indexedDB
          let db = new AngularIndexedDB('hospitaldb', 1);
          db.openDatabase(1).then(() => {

            this.hospitales.forEach(element => {
              db.add('hospitales', element).then(() => {
                // Do something after the value was added
              }, (error) => {
                // registro existente
              });
            });
          });
        });
    }
  }

  obtenerHospital(id: string) {

  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar el ' + hospital.nombre,
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
      .then(borrar => {
        // console.log(borrar);
        if (borrar) {

          this._hospitalService.borrarHospital(hospital._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarHospitales();
            });
        }
      });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital:',
      icon: 'info',
      content: 'input',
      buttons: ['Cancelar', true],
      dangerMode: true
    })
      .then((valor: string) => {
        if (!valor || valor.length === 0) {
          return;
        }
        this._hospitalService.crearHospital(valor)
          .subscribe(resp => this.cargarHospitales());
      });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        // console.log(usuarios);
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  actualizarHospital(hospital: Hospital) {
    if (!hospital.nombre) {
      return;
    }
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
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
    this.cargarHospitales();

  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

}

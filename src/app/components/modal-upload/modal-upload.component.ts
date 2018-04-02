import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
import { ViewChild } from '@angular/core';

declare let swal: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  @ViewChild('inputFile') inputFile: any;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {

        console.log(resp);

        this._modalUploadService.notificacion.emit(resp);
        this.ocultarModal();

      }).catch(err => {
        console.log('Error en la carga de la imagen...');

      });
  }

  ocultarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this.inputFile.nativeElement.value = '';

    this._modalUploadService.ocultarModal();
  }

}

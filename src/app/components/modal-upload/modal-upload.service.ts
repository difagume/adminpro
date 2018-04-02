import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  // usuario, medico, hospital
  public tipo: string;
  public id: string;

  public oculto: string = '';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal service listo');
  }

  ocultarModal() {

  }

  mostrarModal() {

  }

}

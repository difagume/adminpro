import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  // usuario, medico, hospital
  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  // Va a notificar cuando se realice el cambio de una imágen
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal service listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}

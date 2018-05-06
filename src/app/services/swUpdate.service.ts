// Servicio para actualizar Service Worker

import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class SwUpdateService {

  constructor(
    swUpdate: SwUpdate
    // private snackBar: MatSnackBar
  ) {
    swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    if (!swUpdate.isEnabled) {
      console.log('Nope 🙁');
    }
    swUpdate.available.subscribe(event => {
      /* if (promptUser(event)) {
        swUpdate.activateUpdate().then(() => document.location.reload());
      } */
    });
    // this.swUpdate.available.subscribe(evt => {
    // console.log('Una versión más nueva está disponible. Actualiza la página ahora para actualizar el caché');
    // const snack = this.snackBar.open('Actualización disponible', 'Recargar', { duration: 500 });

    /* snack
      .onAction()
      .subscribe(() => {
        document.location.reload();
      }); */
    // });
  }
}

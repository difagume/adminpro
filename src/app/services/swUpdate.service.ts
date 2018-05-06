// Servicio para actualizar Service Worker

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class SwUpdateService {

  constructor(
    swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    if (!swUpdate.isEnabled) {
      console.log('Nope 🙁');
    } else {
      console.log('sw 😊');
    }

    swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      const snack = this.snackBar.open('Actualización disponible', 'Recargar', { duration: 5000 });
      snack.onAction().subscribe(() => {
        swUpdate.activateUpdate().then(() => document.location.reload());
      });
    });
    swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}

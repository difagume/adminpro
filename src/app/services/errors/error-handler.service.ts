import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

declare let swal: any;

@Injectable()
export class ErrorHandlerService {

  constructor(
    // public snackbar: MatSnackBar,
  ) { }

  public handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      // Server or connection error happened
      swal('error', 'error de servidor', 'error');
      if (!navigator.onLine) {
        // Handle offline error
        swal('Aviso', 'No tiene conexión de Internet', 'error');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        if (err.error.mensaje) {
          swal(err.error.mensaje, err.error.errors.message, 'error');
        } else {
          swal(`Error ${err.status}`, err.statusText, 'error');
        }
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      // this.snackbar.open(err.message, 'close');
      swal(`Error ${err.status}`, err.statusText, 'error');
    }
  }

}

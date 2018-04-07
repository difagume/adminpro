import { Injectable } from '@angular/core';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

declare let swal: any;

@Injectable()
export class ErrorHandlerService {

  constructor(
    // public snackbar: MatSnackBar,
  ) { }

  public handleError(err: any) {
    // this.snackbar.open(err.message, 'close');
    swal(err.error.mensaje, err.error.errors.message, 'error');
  }

}

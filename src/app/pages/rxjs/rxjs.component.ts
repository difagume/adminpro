import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let obs = new Observable(observer => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;

        observer.next(contador); // notifica y retorna contador

        if (contador === 3) {
          // para detener el intervalo
          clearInterval(intervalo);
          // para finalizar el observable
          observer.complete();
        }

        // Para mostrar un error
        if (contador === 2) {
          observer.error('Auxilio!');
        }

      }, 1000);

    });

    // Me subscribo al observador para escucharlo
    obs.subscribe(
      numero => console.log('Subscripción: ', numero), // <-- 1er callback cuando se llama al next (cuando recibe algo del observador)
      error => console.error('Error en el obs', error), // <-- 2do callback de algun error
      () => console.log('El observador terminó!')

    );

  }

  ngOnInit() {
  }

}

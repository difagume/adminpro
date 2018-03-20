import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  // Para manejar las subscripciones a los observables
  subscription: Subscription;

  constructor() {

    // Me subscribo al observador para escucharlo
    this.subscription = this.regresaObservable()
      // .retry(2) // <-- Reintenta antes de disparar el error (si no se pone u número reintenta infinitamente)
      .subscribe(
        numero => console.log('Subscripción: ', numero), // <-- 1er callback cuando se llama al next (cuando recibe algo del observador)
        error => console.error('Error en el obs', error), // <-- 2do callback de algun error
        () => console.log('El observador terminó!')

      );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable(observer => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next(salida); // notifica y retorna contador

        /*  if (contador === 3) {
           // para detener el intervalo
           clearInterval(intervalo);
           // para finalizar el observable
           observer.complete();
         } */

        // Para mostrar un error
        /* if (contador === 2) {
          // para detener el intervalo
          // clearInterval(intervalo);
          observer.error('Auxilio!');
        } */

      }, 500);

    }).retry(2)
      .map((respuesta: any) => { // el operador map obtiene la respuesta y nos puede retornar otra cosa
        return respuesta.valor;
      })
      .filter((valor, index) => {
        // el operador filter siempre debe devolver un boolean
        // console.log('Filter: ', valor, index);
        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      });

  }

}

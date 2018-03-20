import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    // Función que estará escuchando el resolve de la promesa
    this.contarTres().then(
      // () => console.log('Terminó!')
      mensaje => console.log('Terminó!', mensaje)
    )
      .catch(error => console.error('Error en la promesa', error));

  }

  ngOnInit() {
  }

  // Función que llama la promesa
  contarTres(): Promise<boolean> {
    // Promesa
    return new Promise((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);


        if (contador === 3) {
          // resolve(); // <-- si el contador es = 3 llama a resolve
          resolve(true);
          // reject('simplemente un error');
          clearInterval(intervalo); // <-- para detener el intervalo
        }

      }, 1000);

    });
  }

}

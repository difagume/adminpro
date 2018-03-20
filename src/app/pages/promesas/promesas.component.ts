import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    let promesa = new Promise((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);


        if (contador === 3) {
          // resolve(); // <-- si el contador es = 3 llama a resolve
          resolve('ok!');
          // reject('simplemente un error');
          clearInterval(intervalo); // <-- para detener el intervalo
        }

      }, 1000);

    });

    // Función que estará escuchando el resolve de la promesa
    promesa.then(
      // () => console.log('Terminó!')
      mensaje => console.log('Terminó!', mensaje)
    )
      .catch(error => console.error('Error en la promesa', error));

  }

  ngOnInit() {
  }

}

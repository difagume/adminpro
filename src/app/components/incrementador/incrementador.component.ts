import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('textoLeyenda') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
    if (this.progreso >= 100) {
      this.progreso = 100;
    } else if (this.progreso <= 0) {
      this.progreso = 0;
    }

    this.cambioValor.emit(this.progreso);
  }

}

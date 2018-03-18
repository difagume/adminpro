import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() grafico: any = {
    labels: [],
    data: [],
    type: '',
    leyenda: ''
  };

  constructor() { }

  ngOnInit() {
  }

}

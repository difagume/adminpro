import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Hace la llamada a cualquier script fuera de angular que se encuetre en un js
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

  color: String;

  constructor() { }

  ngOnInit() {
    init_plugins();

    const colors = ['green', 'purple', 'red', 'brown', 'cyan'];
    const colorify = true;
    Observable
      .timer(800, 800)
      .take(colors.length)
      .map(index => {
        this.color = colors[index];
      })
      .repeat()
      .takeWhile(() => colorify)
      .subscribe();
  }

}

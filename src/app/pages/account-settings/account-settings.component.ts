import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
  }

  cambiarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
  }
}

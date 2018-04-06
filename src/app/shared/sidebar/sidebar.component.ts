import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  menus: any[] = [];

  constructor(
    public _usuarioService: UsuarioService,
    public _sidebar: SidebarService
  ) {
    // console.log('SidebarComponent listo');
    this.menus = this._usuarioService.menu; // Cargo el menú
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}

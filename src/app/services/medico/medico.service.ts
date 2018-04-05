import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';

declare let swal: any;

@Injectable()
export class MedicoService {

  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .map(resp => {
        swal('Medico borrado', 'El médico ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  guardarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico?token=' + this._usuarioService.token;
    return this.http.post(url, medico)
      .map((resp: any) => {

        swal('Médico creado', medico.nombre, 'success');

        return resp.medico;
      });
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.medicos);
  }

  actualizarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, medico)
      .map((resp: any) => {

        swal('Médico actualizado', medico.nombre, 'success');

        return true;
      });
  }

}

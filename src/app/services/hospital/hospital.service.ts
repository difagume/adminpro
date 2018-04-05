import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';

declare let swal: any;

@Injectable()
export class HospitalService {

  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {

  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  crearHospital(nombre: string) {

    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre })
      .map((resp: any) => {
        console.log(resp);

        swal('Hospital creado', nombre, 'success');
        return resp.hospital;
      });
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .map((resp: any) => {

        swal('Hospital actualizado', hospital.nombre, 'success');

        return true;
      });
  }

}

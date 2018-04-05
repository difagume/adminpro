import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router
  ) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        // console.log(resp);
        this.hospitales = resp.hospitales;
      });
  }

  guardarMedico(forma: NgForm) {
    // console.log(forma.valid);
    // console.log(forma.value);

    if (forma.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        // console.log(medico);

        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id)
      .subscribe(hospital => {
        // console.log(hospital);
        this.hospital = hospital;
      })
  }

}

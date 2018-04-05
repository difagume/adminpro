import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {
        // console.log(resp);
        this.hospitales = resp.hospitales;
      });
  }

  guardarMedico(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);

    if (forma.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        console.log(medico);

      });
  }

}

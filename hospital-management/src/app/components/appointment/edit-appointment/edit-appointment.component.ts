import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/shared/patient';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/shared/doctor';
import { Hospital } from 'src/app/shared/hospital';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  appointmentForm = new FormGroup({
    id: new FormControl(''),
    patient: new FormControl(''),
    doctor: new FormControl(''),
    appointmentType: new FormControl(''),
    hospital: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl('')
  });

  newAppointment = {}
  patients!: Patient[];
  doctors!: Doctor[];
  hospitals!: Hospital[];

  filteredPatients!: Observable<Patient[]>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private hospitalService: HospitalService
  ) { }


  ngOnInit() {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;

      this.filteredPatients = this.appointmentForm.controls["patient"].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
    this.hospitalService.getHospitals().subscribe((data) => {
      this.hospitals = data;
    })
  }

  private _filter(value: string): Patient[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.patients.filter(patient => patient.lastName.toLowerCase().indexOf(filterValue) === 0
      || patient.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    this.newAppointment = this.appointmentForm.value;
    // this.newPatient.dateOfBirth = this.getDate(this.newPatient.dateOfBirth);
    // console.log("Added Patient", this.newPatient);

    // if (this.patientId == 0) {
    //   this.patientService.addPatient(this.newPatient).subscribe(() => {
    //     this.location.back();
    //   });
    // } else {
    //   this.patientService.updatePatient(this.patientId, this.newPatient).subscribe(() => {
    //     this.location.back();
    //   })
    // }
  }

  onCancel() {
    this.location.back();
  }

  onPatientSelect(data: any) {
    const { option } = data;
    const selectPatient = this.patients.find(patient => patient.id == option.value);
    this.appointmentForm.controls["patient"].setValue(selectPatient?.firstName + " " + selectPatient?.lastName);
  }

  onChange() {
    const selectedOption = this.appointmentForm.get("appointmentType")?.value;
    console.log(selectedOption);
  }

}

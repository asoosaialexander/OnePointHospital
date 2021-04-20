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
import { AppointmentSlotService } from 'src/app/services/appointment-slot.service';
import { AppointmentSlot } from 'src/app/shared/appointment-slot';
import { Appointment } from 'src/app/shared/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  appointmentForm = new FormGroup({
    id: new FormControl(''),
    patientId: new FormControl(''),
    doctorId: new FormControl(''),
    appointmentType: new FormControl(''),
    hospitalId: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl('')
  });

  newAppointment!: Appointment;
  patients!: Patient[];
  doctors!: Doctor[];
  hospitals!: Hospital[];
  showHospital: boolean = true;

  appointmentSlots!: AppointmentSlot[];
  filteredPatients!: Observable<Patient[]>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private appointmentSlotService: AppointmentSlotService,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) { }


  ngOnInit() {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;

      this.filteredPatients = this.appointmentForm.controls["patientId"].valueChanges.pipe(
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
    const filterValue = value.toLowerCase();
    return this.patients.filter(patient => patient.lastName.toLowerCase().indexOf(filterValue) === 0
      || patient.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    const data = this.appointmentForm.value;
    this.newAppointment = {
      id: 0,
      patientId: data.patientId,
      doctorId: data.doctorId,
      hospitalId: data.hospitalId,
      createdBy: "",
      createdOn: this.getCurrentDate(),
      isCancelled: false,
      cancellationReason: "",
      appointmentType: data.appointmentType,
      appointmentTime: this.getDate(data.date, data.time)
    }

    console.log("alex", this.newAppointment);

    this.appointmentService.addAppointment(this.newAppointment).subscribe((newAppointment) => {
      this.location.back();
      this.snackBar.open("Appointment Created", "Ok", { duration: 2000 });
      this.notificationService.sendAppointmentConfirmationSMS(newAppointment).subscribe();
    });
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
    if (selectedOption == "Video") {
      this.appointmentForm.controls["hospital"].setValue("");
      this.showHospital = false;
    }
    else {
      this.showHospital = true;
    }
  }

  onDoctorSelected(doctorId: number) {
    const date = this.appointmentForm.get("date")?.value;
    if (date) {
      this.getDoctorSlots(doctorId, this.getDate(date));
    }
  }

  onDateSelected(date: string) {
    const doctorId = parseInt(this.appointmentForm.get("doctorId")?.value);
    if (doctorId) {
      this.getDoctorSlots(doctorId, date);
    }
  }

  getDoctorSlots(doctorId: number, date: string) {
    if (doctorId && date) {
      this.appointmentSlotService.getAppointmentSlotsByDoctor(doctorId, date).subscribe((data) => {
        if (data.length !== 0)
          this.appointmentSlots = data;
        else {
          this.appointmentSlots = [];
          this.appointmentForm.controls["time"].setValue("");
          this.snackBar.open("No slots available", "Ok", { duration: 2000 });
        }
      });
    }
  }

  public getDate(dateString: string, timeString?: string) {
    const { year, month, day } = this.getDateComponents(dateString);
    return `${year}-${month}-${day}T${timeString || "00:00"}:00`;
  }

  public getCurrentDate() {
    const { year, month, day, hour, minute, second } = this.getDateComponents();
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }

  getDateComponents(input?: string) {
    var date = input ? new Date(input) : new Date();
    return {
      day: ('0' + date.getDate()).slice(-2),
      month: ('0' + (date.getMonth() + 1)).slice(-2),
      year: date.getFullYear(),
      hour: ('0' + date.getHours()).slice(-2),
      minute: ('0' + date.getMinutes()).slice(-2),
      second: ('0' + date.getSeconds()).slice(-2)
    }
  }

}

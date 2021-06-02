import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/shared/patient';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientFormDialogComponent } from '../patient-form-dialog/patient-form-dialog.component';
import { CustomForm } from 'src/app/shared/custom-form';
import { CustomFormService } from 'src/app/services/custom-form.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  title = '';
  customForms!: CustomForm[];

  patientId: number;
  newPatient!: Patient;

  constructor(
    private customFormService: CustomFormService,
    private location: Location,
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.patientId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.title = this.patientId === 0 ? 'Add' : 'Update';
  }

  ngOnInit(): void {
    if (this.patientId !== 0) {
      this.patientService.getPatientById(this.patientId).subscribe(patient => {
        this.patientForm.setValue(patient);
      });
    }
    // this.customFormService.getCustomForm().subscribe((data) => {
    //   this.customForms = data;
    //   console.log(this.customForms);
    // });
  }

  onSubmit(): void {
    this.newPatient = this.patientForm.value;
    this.newPatient.dateOfBirth = this.getDate(this.newPatient.dateOfBirth);
    console.log('Added Patient', this.newPatient);

    if (this.patientId === 0) {
      this.patientService.addPatient(this.newPatient).subscribe(() => {
        this.location.back();
      });
    } else {
      this.patientService.updatePatient(this.patientId, this.newPatient).subscribe(() => {
        this.location.back();
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }

  public getDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();       // yields date
    const month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    const year = date.getFullYear();  // yields year
    const hour = date.getHours();     // yields hours
    const minute = date.getMinutes(); // yields minutes
    const second = date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    // var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;

    return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}T00:00:00`;
  }

  addEntry(): void {
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(selectedForm => {
      this.customFormService.getCustomFormById(selectedForm).subscribe((data) => {
        if (this.customForms === undefined) {
          this.customForms = [{ ...data }];
        } else {
          this.customForms.push(data);
        }
      });
    });
  }

}

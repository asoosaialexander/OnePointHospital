import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/shared/patient';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'gender', 'actions'];
  dataSource!: MatTableDataSource<Patient>;

  constructor(private patientService: PatientService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  delete(entry: Patient): void {
    this.patientService.deletePatient(entry.id).subscribe(() => {
      this.getPatients();
    });
  }

}

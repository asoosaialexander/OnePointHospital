import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomFormService } from 'src/app/services/custom-form.service';
import { CustomForm } from 'src/app/shared/custom-form';

@Component({
  selector: 'app-patient-form-dialog',
  templateUrl: './patient-form-dialog.component.html',
  styleUrls: ['./patient-form-dialog.component.css']
})
export class PatientFormDialogComponent implements OnInit {

  listSource!: CustomForm[];

  constructor(
    public dialogRef: MatDialogRef<PatientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomForm[],
    private customFormService: CustomFormService) {

    this.customFormService.getCustomForm().subscribe((data) => {
      console
      this.listSource = data;
    })
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

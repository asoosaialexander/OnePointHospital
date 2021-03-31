import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';
import { CustomForm } from 'src/app/shared/custom-form';
import { Lookup } from 'src/app/shared/lookup';
import { QuestionBase } from 'src/app/shared/question-base';
import { EditFieldDialogComponent } from '../edit-field-dialog/edit-field-dialog.component';
import { Location } from '@angular/common';
import { CustomFormService } from 'src/app/services/custom-form.service';

@Component({
  selector: 'app-create-custom-form',
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.css']
})
export class CreateCustomFormComponent implements OnInit {

  displayedColumns: string[] = ["label", "type", "actions"];
  dataSource!: MatTableDataSource<QuestionBase>;
  formTypes!: Lookup[];
  editForm: CustomForm = {
    id: 0,
    name: "",
    type: "",
    columns: 4,
    alwaysInclude: false,
    fields:[]
  };

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private customFormservice: CustomFormService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    const formId = parseInt(this.route.snapshot.paramMap.get('id') || "0", 10);

    this.lookupService.getLookupTypes().subscribe((data) => {
      const id = data.find(x => x.name == "Form Type")?.id;
      if (id) {
        this.lookupService.getLookupById(id).subscribe((data) => {
          this.formTypes = data;
        })
      }
      this.customFormservice.getCustomFormById(formId).subscribe((data)=>{
        this.editForm = data;
        this.dataSource.data = this.editForm.fields;
      });
    });
  }

  openDialog(field:QuestionBase){
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '250px',
      data: field
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        if (result != undefined) {
          this.editForm.fields.push(result);
          this.dataSource.data = this.editForm.fields
        }
      }
      catch (err) {
        console.log("err", err);
      }
    });
  }

  addField() {
    let newField: QuestionBase = new QuestionBase();
    this.openDialog(newField);
  }

  editField(field: QuestionBase) {
    this.openDialog(field);
  }

  deleteField(field: string) {

  }

  submitForm(){

  }

  cancelChanges(){
    this.location.back();
  }

}

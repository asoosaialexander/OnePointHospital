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
  formId: string = "";
  editForm: CustomForm = {
    id: "",
    name: "",
    type: "",
    columns: 1,
    alwaysInclude: false,
    fields: [],
    active: true
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

    this.formId = this.route.snapshot.paramMap.get('id') || "0";

    this.lookupService.getLookupTypes().subscribe((data) => {
      const id = data.find(x => x.name == "Form Type")?.id;
      if (id) {
        this.lookupService.getLookupById(id).subscribe((data) => {
          this.formTypes = data;
        })
      }
      this.customFormservice.getCustomFormById(this.formId).subscribe((data) => {
        this.editForm = data;
        this.dataSource.data = this.editForm.fields;
      });
    });
  }

  openDialog(field: QuestionBase) {
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '500px',
      data: field
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        if (result != undefined) {
          var fields = this.editForm.fields;
          let isExist = false;

          fields.forEach(item => {
            if (item.value == result.value) {
              isExist = true;
            }
            if (item.controlType.indexOf("Text") != -1) {
              item.options = []
            }
          });

          //Update existing field
          if (isExist) {
            this.editForm.fields.map(item => {
              if (item.value == result.value) {
                return result;
              }
              else {
                return item;
              }
            });
          }
          else {
            this.editForm.fields.push(result);
          }
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

  deleteField(deletedField: QuestionBase) {
    this.editForm.fields = this.editForm.fields.filter(field => {
      return field.label !== deletedField.label;
    });
    this.dataSource.data = this.editForm.fields;
  }

  submitForm() {
    if (this.formId == "0") {
      this.customFormservice.addCustomForm(this.editForm).subscribe();
      this.openSnackBar("Form added!")
    }
    else {
      this.customFormservice.updateCustomForm(this.editForm.id, this.editForm).subscribe();
      this.openSnackBar("Form updated!")
    }
    this.location.back();
  }

  cancelChanges() {
    this.location.back();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 2000,
    });
  }

}

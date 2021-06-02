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

  displayedColumns: string[] = ['label', 'type', 'actions'];
  dataSource!: MatTableDataSource<QuestionBase>;
  formTypes!: Lookup[];
  formId = '';
  editForm: CustomForm = {
    id: '',
    name: '',
    type: '',
    columns: 1,
    alwaysInclude: false,
    fields: [],
    active: true
  };

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private customFormService: CustomFormService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.formId = this.route.snapshot.paramMap.get('id') || '0';

    this.lookupService.getLookupTypes().subscribe((lookupData) => {
      const id = lookupData.find(x => x.name === 'Form Type')?.id;
      if (id) {
        this.lookupService.getLookupById(id).subscribe((selData) => {
          this.formTypes = selData;
        });
      }
      this.customFormService.getCustomFormById(this.formId).subscribe((formData) => {
        formData.fields = formData.fields.sort(this.sortObject);
        this.editForm = formData;
        this.dataSource.data = this.editForm.fields;
      });
    });
  }

  sortObject(a: QuestionBase, b: QuestionBase): number {
    if (a.order > b.order) {
      return 1;
    }
    else if (a.order < b.order) {
      return -1;
    }
    else {
      return 0;
    }
  }

  moveUp(rowId: number, item: QuestionBase): void {
    const temp = this.editForm.fields[rowId].order;
    this.editForm.fields[rowId].order = this.editForm.fields[rowId - 1].order;
    this.editForm.fields[rowId - 1].order = temp;
    this.dataSource.data = this.dataSource.data.sort(this.sortObject);
    this.dataSource.data = this.editForm.fields;
  }

  moveDown(rowId: number, item: QuestionBase): void {
    const temp = this.editForm.fields[rowId].order;
    this.editForm.fields[rowId].order = this.editForm.fields[rowId + 1].order;
    this.editForm.fields[rowId + 1].order = temp;
    this.dataSource.data = this.dataSource.data.sort(this.sortObject);
    this.dataSource.data = this.editForm.fields;
  }

  openDialog(field: QuestionBase): void {
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '500px',
      data: field
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        if (result !== undefined) {
          const fields = this.editForm.fields;
          let isExist = false;

          fields.forEach(item => {
            if (item.label === result.label) {
              isExist = true;
            }
            if (item.controlType.indexOf('Text') !== -1) {
              item.options = [];
            }
          });

          // Update existing field
          if (isExist) {
            this.editForm.fields.map(item => {
              if (item.value === result.value) {
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
          this.dataSource.data = this.editForm.fields;
        }
      }
      catch (err) {
        console.log('err', err);
      }
    });
  }

  addField(): void {
    const newField: QuestionBase = new QuestionBase();
    newField.order = this.dataSource.data.length + 1;
    this.openDialog(newField);
  }

  editField(field: QuestionBase): void {
    this.openDialog(field);
  }

  deleteField(deletedField: QuestionBase): void {
    this.editForm.fields = this.editForm.fields.filter(field => {
      return field.label !== deletedField.label;
    });
    this.dataSource.data = this.editForm.fields;
  }

  submitForm(): void {
    if (this.formId === '0') {
      this.customFormService.addCustomForm(this.editForm).subscribe();
      this.openSnackBar('Form added!');
    }
    else {
      this.customFormService.updateCustomForm(this.editForm.id, this.editForm).subscribe();
      this.openSnackBar('Form updated!');
    }
    this.location.back();
  }

  cancelChanges(): void {
    this.location.back();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

}

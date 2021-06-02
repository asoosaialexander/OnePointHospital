import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FieldOption, QuestionBase } from 'src/app/shared/question-base';

@Component({
  selector: 'app-edit-field-dialog',
  templateUrl: './edit-field-dialog.component.html',
  styleUrls: ['./edit-field-dialog.component.css']
})
export class EditFieldDialogComponent implements OnInit {

  dataSource!: MatTableDataSource<FieldOption>;
  displayedColumns: string[] = ['value', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionBase
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = data.options;
  }

  ngOnInit(): void {
  }

  addValue(): void {
    const data = this.dataSource.data;
    data.push(new FieldOption());
    this.dataSource.data = data;
  }

  deleteValue(value: string): void {
    const data = this.dataSource.data;
    let index = 0;
    data.forEach((item, i) => {
      if (item.value === value) {
        index = i;
      }
    });
    data.splice(index, 1);
    this.dataSource.data = data;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    if (this.data.key === '') {
      this.data.key = this.data.label;
    }
    this.data.options = this.dataSource.data;
    this.data.options.forEach(option => {
      option.key = option.value;
    });
  }

}

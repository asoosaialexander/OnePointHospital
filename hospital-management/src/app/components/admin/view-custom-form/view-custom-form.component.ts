import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomFormService } from 'src/app/services/custom-form.service';
import { CustomForm } from 'src/app/shared/custom-form';

@Component({
  selector: 'app-view-custom-form',
  templateUrl: './view-custom-form.component.html',
  styleUrls: ['./view-custom-form.component.css']
})
export class ViewCustomFormComponent implements OnInit {

  displayedColumns: string[] = ["name", "type", "actions"];
  dataSource!: MatTableDataSource<CustomForm>;

  constructor(private customFormService: CustomFormService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getForms();
  }

  getForms() {
    this.customFormService.getCustomForm().subscribe((data) => {
      this.dataSource.data = data;
    })
  }

  deleteForm(form: CustomForm) {
    this.customFormService.deleteCustomForm(form.id).subscribe(() => {
      this.getForms();
    });
  }

}

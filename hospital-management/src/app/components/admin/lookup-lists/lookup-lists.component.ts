import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LookupService } from 'src/app/services/lookup.service';
import { Lookup, LookupType } from 'src/app/shared/lookup';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-lookup-lists',
  templateUrl: './lookup-lists.component.html',
  styleUrls: ['./lookup-lists.component.css']
})
export class LookupListsComponent implements OnInit {

  displayedColumns: string[] = ['value', 'actions'];
  lookupTypeData: LookupType[] = [];
  dataSource: MatTableDataSource<Lookup>;
  selectedId = 0;
  title = '';
  newEntry: Lookup = { id: 0, value: '', typeId: 0 };

  constructor(
    private lookupService: LookupService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private logger: NGXLogger
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getLookupTypes();
  }

  getLookupTypes(): void {
    this.lookupService.getLookupTypes().subscribe(
      data => {
        this.lookupTypeData = data;
      }
    );
  }

  getLookupData(typeId: number): void {
    this.lookupService.getLookupById(typeId).subscribe(
      data => this.dataSource.data = data
    );
  }

  onLookupTypeChange(id: number): void {
    const selected = this.lookupTypeData.map(item => {
      if (item.id === id) {
        this.selectedId = item.id;
        this.title = item.name;
      }
    });

    this.getLookupData(id);
  }

  addEntry(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: { ...this.newEntry, typeId: this.selectedId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.lookupService.addLookupEntry(result).subscribe(() => {
          this.getLookupData(this.selectedId);
        });
      }
    });
  }

  editEntry(entry: Lookup): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: entry
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.lookupService.updateLookupEntry(result).subscribe();
      }
    });
  }

  deleteEntry(entry: Lookup): void {
    this.lookupService.deleteEntry(entry.id).subscribe(() => {
      this.getLookupData(this.selectedId);
      this.openSnackBar('Deleted successfully');
    });
    this.logger.info(`${entry.value} is deleted from list`);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

}

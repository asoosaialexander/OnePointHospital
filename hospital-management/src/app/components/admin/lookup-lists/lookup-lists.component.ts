import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

export interface Lookup {
  id: number;
  value: string;
}

const LOOKUP_DATA: Lookup[] = [
  { id: 1, value: "India" },
  { id: 2, value: "Iran" },
  { id: 3, value: "Srilanka" },
  { id: 4, value: "United Arab Emirates" }
];

@Component({
  selector: 'app-lookup-lists',
  templateUrl: './lookup-lists.component.html',
  styleUrls: ['./lookup-lists.component.css']
})
export class LookupListsComponent implements OnInit {

  displayedColumns: string[] = ["value", "actions"];
  dataSource = LOOKUP_DATA;
  newEntry: Lookup = { id: 0, value: "" };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addEntry(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: this.newEntry
    });

    dialogRef.afterClosed().subscribe(result => {
      LOOKUP_DATA.push(result);
    });
  }

  editEntry(entry: Lookup): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: entry
    });

    dialogRef.afterClosed().subscribe(result => {
      LOOKUP_DATA.push(result);
    });
  }

  deleteEntry(entry: Lookup): void {
    const index = LOOKUP_DATA.indexOf(entry);
    if (index > -1) {
      LOOKUP_DATA.splice(index, 1);
    }
  }
}

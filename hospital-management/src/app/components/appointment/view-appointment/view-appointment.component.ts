import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentDetailsService } from 'src/app/services/appointment-details.service';
import { AppointmentDetails } from 'src/app/shared/appointment-details';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'type', 'location', 'with', 'status', 'actions'];
  dataSource!: MatTableDataSource<AppointmentDetails>;

  constructor(
    private appointmentDetailsService: AppointmentDetailsService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    const frequency = this.route.snapshot.paramMap.get('frequency') || '';
    console.log(frequency);

    switch (frequency) {
      case 'day':
        this.appointmentDetailsService.getTodayAppointments().subscribe(data => {
          this.dataSource.data = data;
        });
        break;
      case 'week':
        this.appointmentDetailsService.getWeekAppointments().subscribe(data => {
          this.dataSource.data = data;
        });
        break;
      default:
        this.appointmentDetailsService.getTodayAppointments().subscribe(data => {
          this.dataSource.data = data;
        });
    }

  }

  delete(appointment: AppointmentDetails): void {

  }
}

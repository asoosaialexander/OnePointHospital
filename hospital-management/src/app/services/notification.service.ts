import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../shared/appointment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = environment.apiUrl + 'Notification/';

  constructor(private http: HttpClient) { }

  sendAppointmentConfirmationSMS(appointment: Appointment): Observable<{}> {
    return this.http.post(this.url, appointment);
  }
}

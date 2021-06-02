import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentDetails } from './../shared/appointment-details';

@Injectable({
    providedIn: 'root'
})
export class AppointmentDetailsService {

    private url = environment.apiUrl + 'appointments/';

    constructor(private http: HttpClient) { }

    getTodayAppointments(): Observable<AppointmentDetails[]> {
        return this.http.get<AppointmentDetails[]>(this.url + 'today');
    }

    getWeekAppointments(): Observable<AppointmentDetails[]> {
        return this.http.get<AppointmentDetails[]>(this.url + 'thisWeek');
    }
}

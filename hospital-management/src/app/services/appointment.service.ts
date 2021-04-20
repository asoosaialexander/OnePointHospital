import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../shared/appointment';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    private url = environment.apiUrl + 'appointments/';

    constructor(private http: HttpClient) { }

    getAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.url);
    }

    getAppointmentById(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(this.url + id);
    }

    addAppointment(entry: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(this.url, entry);
    }

    updateAppointment(appointmentId: number, entry: Appointment): Observable<{}> {
        return this.http.put(this.url + appointmentId, entry);
    }

    deleteAppointment(id: number): Observable<{}> {
        return this.http.delete(this.url + id);
    }
}

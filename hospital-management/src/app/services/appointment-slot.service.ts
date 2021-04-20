import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentSlot } from '../shared/appointment-slot';

@Injectable({
    providedIn: 'root'
})
export class AppointmentSlotService {

    private url = environment.apiUrl + 'appointmentSlots/';

    constructor(private http: HttpClient) { }

    getAppointmentSlots(): Observable<AppointmentSlot[]> {
        return this.http.get<AppointmentSlot[]>(this.url);
    }

    getAppointmentSlotsByDoctor(doctorId: number, date: string): Observable<AppointmentSlot[]> {
        const slotUrl = `${this.url}GetDoctorSlotsByDate?doctorId=${doctorId}&date=${date}`;
        return this.http.get<AppointmentSlot[]>(slotUrl);
    }

    addAppointmentSlot(entry: AppointmentSlot): Observable<{}> {
        return this.http.post(this.url, entry);
    }

    updateAppointmentSlot(appointmentSlotId: number, entry: AppointmentSlot): Observable<{}> {
        return this.http.put(this.url + appointmentSlotId, entry);
    }

    deleteAppointmentSlot(id: number): Observable<{}> {
        return this.http.delete(this.url + id);
    }
}

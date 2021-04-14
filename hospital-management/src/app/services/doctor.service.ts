import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../shared/doctor';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    private url = environment.apiUrl + 'doctors/';

    constructor(private http: HttpClient) { }

    getDoctors(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(this.url);
    }

    getDoctorById(id: number): Observable<Doctor> {
        return this.http.get<Doctor>(this.url + id);
    }

    addDoctor(entry: Doctor): Observable<{}> {
        return this.http.post(this.url, entry);
    }

    updateDoctor(doctorId: number, entry: Doctor): Observable<{}> {
        return this.http.put(this.url + doctorId, entry);
    }

    deleteDoctor(id: number): Observable<{}> {
        return this.http.delete(this.url + id);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../shared/patient';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    private url = environment.apiUrl + 'patients/';

    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(this.url);
    }

    getPatientById(id: number): Observable<Patient> {
        return this.http.get<Patient>(this.url + id);
    }

    addPatient(entry: Patient): Observable<{}> {
        return this.http.post(this.url, entry);
    }

    updatePatient(patientId: number, entry: Patient): Observable<{}> {
        return this.http.put(this.url + patientId, entry);
    }

    deletePatient(id: number): Observable<{}> {
        return this.http.delete(this.url + id);
    }
}

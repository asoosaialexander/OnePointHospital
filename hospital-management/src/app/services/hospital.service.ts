import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../shared/hospital';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {

    private url = environment.apiUrl + 'hospitals/';

    constructor(private http: HttpClient) { }

    getHospitals(): Observable<Hospital[]> {
        return this.http.get<Hospital[]>(this.url);
    }

    getHospitalById(id: number): Observable<Hospital> {
        return this.http.get<Hospital>(this.url + id);
    }

    addHospital(entry: Hospital): Observable<{}> {
        return this.http.post(this.url, entry);
    }

    updateHospital(hospitalId: number, entry: Hospital): Observable<{}> {
        return this.http.put(this.url + hospitalId, entry);
    }

    deleteHospital(id: number): Observable<{}> {
        return this.http.delete(this.url + id);
    }
}

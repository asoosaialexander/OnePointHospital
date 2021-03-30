import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lookup, LookupType } from '../shared/lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private url = environment.apiUrl + 'lookup/';

  constructor(private http: HttpClient) { }

  getLookupTypes(): Observable<LookupType[]> {
    return this.http.get<LookupType[]>(this.url);
  }

  getLookupById(id: number): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(this.url + id);
  }

  addLookupEntry(entry: Lookup): Observable<{}> {
    return this.http.post(this.url, entry);
  }

  updateLookupEntry(entry: Lookup): Observable<{}> {
    return this.http.put(this.url + entry.id, entry);
  }

  deleteEntry(id: number): Observable<{}> {
    return this.http.delete(this.url + id);
  }
}

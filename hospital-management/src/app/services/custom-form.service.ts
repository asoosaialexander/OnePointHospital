import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomForm } from '../shared/custom-form';

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  private url = environment.apiUrl + 'customform/';

  constructor(private http: HttpClient) { }

  getCustomForm(): Observable<CustomForm[]> {
    return this.http.get<CustomForm[]>(this.url);
  }

  getCustomFormById(id: string): Observable<CustomForm> {
    return this.http.get<CustomForm>(this.url + id);
  }

  addCustomForm(data: CustomForm): Observable<CustomForm> {
    return this.http.post<CustomForm>(this.url, data);
  }

  updateCustomForm(id: string, data: CustomForm): Observable<{}> {
    return this.http.put(this.url + id, data);
  }

  deleteCustomForm(id: string): Observable<CustomForm> {
    return this.http.delete<CustomForm>(this.url + id);
  }
}

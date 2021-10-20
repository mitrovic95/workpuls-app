import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { Shift } from '../models/shift';
import { environment } from '../../../../environments/environment';
import { Employee } from '../models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private resource = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.resource}/all-employees`,
      httpOptions
    );
  }

  getEmployeeShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.resource}/employee-shifts`,
      httpOptions
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AppConstants } from './app.constants';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.GET_ALL_EMPLOYEES);
  }

  getEmployeewithId(id: number): Observable<any> {
    return this.http.get(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.GET_EMPLOYEE_BY_ID + id);
  }
  updateEmployee(employee: any) {
    return this.http.put(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.UPDATE_EMPLOYEE, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.DELETE_EMPLOYEE + id);
  }
  addEmployee(employee: any) {
    return this.http.post(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.ADD_EMPLOYEE, employee);
  }
}

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
    return this.http.get(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.GET_ALL_EMPLOYEES, this.getHeaders());
  }

  getEmployeeById(id: any): Observable<any> {
    return this.http.get(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.GET_EMPLOYEE_BY_ID + id, this.getHeaders());
  }
  updateEmployee(employee: any): Observable<any> {
    return this.http.put(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.UPDATE_EMPLOYEE + employee.id, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.DELETE_EMPLOYEE + id);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(environment.EMPLOYEE_URL + AppConstants.EMPLOYEE_API_END_POINTS.ADD_EMPLOYEE, employee);
  }

  getHeaders(): any {
    return {
      headers: { 'app-id': '5fdb6ad1eaf0a9ca8977c4be' }
    };
  }
}

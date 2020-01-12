import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = 'http://localhost:3000/employee';
  constructor(private http: HttpClient) { }

  getEmployees(departmentId): Observable<Employee[]>{
    if(departmentId){
      return this.http.get<Employee[]>(`${this.url}/${departmentId}`);
    }
    return this.http.get<Employee[]>(this.url);
  }

  saveEmployee(employee): Observable<Employee>{
    return this.http.post<Employee>(this.url, employee);
  }

  editEmployee(employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.url}/${employee.id}`, employee);
  }

  deleteEmployee(id): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  } 

  checkEmail(email) : Observable<any>{
    return this.http.get<Employee[]>(`${this.url}/check/${email}`);
  }
}

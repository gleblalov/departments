import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url = 'http://localhost:3000/department';
  departmentId: string;
  departments: Department[];

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.url);
  }

  saveDepartment(department): Observable<Department>{
    return this.http.post<Department>(this.url, department);
  }

  editDepartment(department): Observable<Department>{
    const test = this.http.put<Department>(`${this.url}/${department.id}`, department);
    return test;
  }

  deleteDepartment(id): Observable<Department> {
    return this.http.delete<Department>(`${this.url}/${id}`);
  } 
}

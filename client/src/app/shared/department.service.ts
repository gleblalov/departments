import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model';
import { Observable } from 'rxjs';
import { delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url = 'http://localhost:3000/department';
  departmentId: string;
  departments: Department[];

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.url).pipe(delay(500));
  }

  saveDepartment(department): Observable<Department>{
    return this.http.post<Department>(this.url, department);
  }

  editDepartment(department): Observable<Department>{
    return this.http.put<Department>(`${this.url}/${department.id}`, department);
  }

  deleteDepartment(id): Observable<Department> {
    return  this.http.delete<Department>(`${this.url}/${id}`);
  } 
}

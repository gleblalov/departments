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

  editDepartment(id, department): Observable<Department>{
    return this.http.put<Department>(`${this.url}/${id}`, department);
  }

  deleteDepartment(id): Observable<Department> {
    return  this.http.delete<Department>(`${this.url}/${id}`);
  } 
}



// {
// 	"id": "",
// "fname": " ",
// "lname": "Fdsgfsgaf",
// "email": "fsdaf@rrqggjr.ru",
// "experience": "",
// "position": "",
// "dateOfBirth": "",
// "departmentID": "5e26d2fa1802c844ccae863b"
// }
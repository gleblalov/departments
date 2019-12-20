import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


import { Department, } from '../model';
import { DepartmentService } from '../shared/department.service';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  departments: Department[];
  department: Department;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private depService: DepartmentService,
    private empService: EmployeeService,
    ) {
      this.departments = [];
      this.department = {
        title: '',
        describe: ''
      }
     }

  ngOnInit() {
    this.getDepartments();
    this.getQueryParams();
  }

  openDepartment(department){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        isEditDepartment: true,
        special: JSON.stringify(department)
      }
    };
    this.router.navigate(['/home', 'edit-department'], navigationExtras);
  }

  openListEmployees(id){
    this.depService.departmentId = id;
    this.router.navigate(['employees']);
  }

  getDepartments(){
    this.depService.getDepartments().subscribe(response => {
      this.departments = response;
      this.depService.departments = this.departments;
    });
  }

  getQueryParams(){
    this.route.queryParams.subscribe(params => { 
      if (params && params.newDepartment){
        if(JSON.parse(params.isEditDepartment) === false){
          this.department = JSON.parse(params.newDepartment);
          this.departments.push(this.department);
        }

        if(JSON.parse(params.isEditDepartment) === true){
          this.department = JSON.parse(params.newDepartment);   
          this.departments.forEach((item, index) =>{
            if(item.id === this.department.id){
              this.departments[index] = this.department;
            } 
          })
        }
      }
    }); 
  }

  deleteDepartment(id){
    this.depService.deleteDepartment(id).subscribe();
    this.departments = this.departments.filter(t => t.id !== id);
  }
}










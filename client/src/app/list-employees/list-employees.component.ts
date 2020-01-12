import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


import { Employee } from '../model';
import { EmployeeService } from '../shared/employee.service';
import { DepartmentService } from '../shared/department.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  
  employees: Employee[];
  employee: Employee;
  departmentId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private depService: DepartmentService,
  ) {
    this.employees = [];
    this.departmentId = this.depService.departmentId
  }

  ngOnInit() {
    this.getEmployee();
    this.getQueryParams();
  }

  getEmployee(){
    this.empService.getEmployees(this.departmentId).subscribe(response => {
      this.employees = response;
    }, err => {
      console.error(err)
    });
  }

  getQueryParams(){
    this.route.queryParams.subscribe(params => { 
      if (params && params.newEmployee){
        if(JSON.parse(params.isEditEmployee) === false){
          const json = JSON.parse(params.newEmployee);
          this.employee = json.result
          this.employees.push(this.employee);
        }

        if(JSON.parse(params.isEditEmployee) === true){
          this.employee = JSON.parse(params.newEmployee);  
          this.employees.forEach((item, index) =>{
            if(item.id === this.employee.id){
              this.employees[index] = this.employee;
            } 
          })
        }
      }
    }); 
  }

  getTitleDepartment(id){
    let title;
    this.depService.departments.forEach((item, index) => {
      if(item.id == id){
        title = this.depService.departments[index].title;
      }
    })
    
    return title;
  }

  openEmployee(employee){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        isEditEmployee: true,
        employee: JSON.stringify(employee)
      }
    };
  
    this.router.navigate(['/employees', 'edit-employee'], navigationExtras);
  }

  deleteEmployee(id){
    this.empService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(t => t.id !== id);
    }, err => {
      alert(err.error.message)
      console.error(err);
    });
  }

}

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
  isLoading: boolean;
  textError: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private depService: DepartmentService,
  ) {
    this.employees = [];
    
    this.isLoading = false;
  }

  ngOnInit() {
    this.getEmployee();
    this.getQueryParams();
  }

  getEmployee(){
    this.isLoading = true
    this.departmentId = this.depService.departmentId
    this.empService.getEmployees(this.departmentId).subscribe(response => {
      this.employees = response;
      this.isLoading = false;
    }, err => {
      console.error(err)
      this.textError = `${err.status}: response failure, try to reload page`;
      this.isLoading = false;
      setTimeout(()=> this.textError = null, 2500)
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
    let title = 'Not distributed';
    if(this.depService.departments){
      this.depService.departments.forEach((item, index) => {
        if(item.id == id){
          title = this.depService.departments[index].title;
          title = title[0].toUpperCase() + title.slice(1);
        } 
      })
    }
    
    
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { Employee, Department, } from '../model';
import { EmployeeService } from '../shared/employee.service';
import { DepartmentService } from '../shared/department.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  form: FormGroup
  employee: Employee
  isEditEmployee: boolean
  validationEmail: boolean;
  textAlert: string;
  isSuccesAlert: boolean;

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    protected depService: DepartmentService,
  ) {
    this.isEditEmployee = false;
    this.validationEmail = true;
    this.form = new FormGroup({
      id: new FormControl(''),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required],),
      experience: new FormControl(''),
      position: new FormControl(''),
      dateOfBirth: new FormControl(''),
      departmentID: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit() {
    this.getParamsFromEmployeesPage();
  }

  getParamsFromEmployeesPage(){
    this.route.queryParams.subscribe(params => {
      if (params && params.employee) {
        this.form.setValue(JSON.parse(params.employee));
        this.isEditEmployee = JSON.parse(params.isEditEmployee);
      } 
    }); 
  }

  saveEmployee() {
        this.employee = {...this.form.value}

        if(this.isEditEmployee === false){
          this.empService.saveEmployee(this.employee).subscribe(response => {
            this.textAlert = 'New employee has been added successfully.'
            this.isSuccesAlert = true;
            setTimeout(()=> {
              this.textAlert = ''
              this.passParameters(response);
            }, 2500)
           }, err => {
            if(err.error.message === 'this email is busy'){
              this.validationEmail = false
              console.error(err);
            } else {
              this.textAlert = 'Response failure, try adding again.'
              this.isSuccesAlert = false;
              setTimeout(()=> this.textAlert = '', 2500)
              console.error(err);
            }
           });
        }
    
        if(this.isEditEmployee === true){
          this.empService.editEmployee(this.employee).subscribe(() => {
            this.textAlert = 'Employee data has been modified successfully.'
            this.isSuccesAlert = true;
            setTimeout(()=> {
              this.textAlert = ''
              this.passParameters(this.employee);
            }, 2500)
           }, err => {
            if(err.error.message === 'this email is busy'){
              this.validationEmail = false
              console.error(err);
            } else {
              this.textAlert = 'Response failure, try adding again.'
              this.isSuccesAlert = false;
              setTimeout(()=> this.textAlert = '', 2500)
              console.error(err);
            }
           });
        } 
  }

  passParameters(employee){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        isEditEmployee: this.isEditEmployee,
        newEmployee: JSON.stringify(employee)
      }
    };

    this.router.navigate(['employees'], navigationExtras);
  }

  closeErrorBusy(){
    this.validationEmail = true;
  }
}



// saveEmployee() {
//   this.empService.checkEmail(this.form.value.email).subscribe(response => {
//     if(response === null){
//       this.employee = {...this.form.value}
//       if(this.isEditEmployee === false){
//         this.empService.saveEmployee(this.employee).subscribe(response => {
//           this.passParameters(response);
//          });
//       }
  
//       if(this.isEditEmployee === true){
//         this.empService.editEmployee(this.employee).subscribe(() => {
//           this.passParameters(this.employee);
//          });
//       } 
//     } else {
//       this.validationEmail = false;
//     }
//   });
// }


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
    this.textAlert = '';
    this.isEditEmployee = false;
    this.validationEmail = true;
    this.form = new FormGroup({
      id: new FormControl(''),
      fname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z-\.]{1,20}$/)]),
      lname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z-\.]{1,20}$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/)],),
      experience: new FormControl(''),
      position: new FormControl('', [Validators.required]),
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
        if(this.employee.fname !== '' && this.employee.lname !== ''){
          this.employee.fname = this.employee.fname[0].toUpperCase() + this.employee.fname.slice(1);
          this.employee.lname = this.employee.lname[0].toUpperCase() + this.employee.lname.slice(1);
        }

        if(this.isEditEmployee === false){
          this.empService.saveEmployee(this.employee).subscribe(response => {
            this.textAlert = 'New employee has been added successfully.'
            this.isSuccesAlert = true;
            setTimeout(()=> {
              this.textAlert = ''
              this.passParameters(response);
            }, 1500)
           }, err => this.errorProcesing(err));
        }
    
        if(this.isEditEmployee === true){
          this.empService.editEmployee(this.employee).subscribe(() => {
            this.textAlert = 'Employee data has been modified successfully.'
            this.isSuccesAlert = true;
            setTimeout(()=> {
              this.textAlert = ''
              this.passParameters(this.employee);
            }, 1500)
           }, err => this.errorProcesing(err));
        } 
  }

  errorProcesing(err){
    if(err.error.message === 'this email is already registered'){
      this.validationEmail = false
      this.textAlert = 'This email is already registered.'
      setTimeout(()=> this.textAlert = '', 1500)
    } else {
      this.isSuccesAlert = false;
      err.error.message.forEach(item => {
        for(let key in item.constraints){
          this.textAlert += `${item.constraints[key]}\n`
        }
      });
      
      setTimeout(()=> this.textAlert = '', 1500)
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

  getMaxDate(){
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 16, 0);
    const maxDate = `${newDate.getFullYear()}-0${newDate.getMonth()+1}-${newDate.getDate()}`;

    return maxDate;
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


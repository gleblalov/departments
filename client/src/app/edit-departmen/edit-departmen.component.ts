import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Department } from '../model';
import { DepartmentService } from '../shared/department.service';

@Component({
  selector: 'app-edit-departmen',
  templateUrl: './edit-departmen.component.html',
  styleUrls: ['./edit-departmen.component.css']
})
export class EditDepartmenComponent implements OnInit {

  form: FormGroup;
  department: Department;
  isEditDepartment: boolean;
  validationTitle: boolean;
  textAlert: string;
  isSuccesAlert: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private depService: DepartmentService,
    ) { 
    this.form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      describe: new FormControl('',),
    })
    this.department = {
      title: '',
      describe: ''
    }
    
    this.isEditDepartment = false;
    this.validationTitle = true;
  }

  ngOnInit() {
    this.getParamsFromDepartmentsPage();
  }

  getParamsFromDepartmentsPage(){
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.form.setValue(JSON.parse(params.special));
        this.isEditDepartment = JSON.parse(params.isEditDepartment);
      } 
     }); 
  }
  
  saveDepartment(){
      this.department = {...this.form.value}
      this.department.title = this.department.title[0].toUpperCase() + this.department.title.slice(1);

      if(this.isEditDepartment === false){
        this.depService.saveDepartment(this.department).subscribe((response) => {
          this.textAlert = 'New department has been added successfully.'
          this.isSuccesAlert = true;
          setTimeout(()=> {
              this.textAlert = ''
              this.passParameters(response);
            }, 2500)
        }, err => {
          if(err.error.message === 'this title is already registered'){
            this.validationTitle = false
            console.error(err);
          } else {
            console.error(err);
            this.isSuccesAlert = false;
            this.textAlert = 'Response failure, try adding again.'
            setTimeout(()=> this.textAlert = '', 2500)
          }
        });
      }

      if(this.isEditDepartment === true){
        this.depService.editDepartment(this.department).subscribe((response) => {
          this.textAlert = 'Department data has been modified successfully.'
          this.isSuccesAlert = true;
          setTimeout(()=> {
            this.textAlert = ''
            this.passParameters(this.department);
          }, 2500)
        }, err => {
          if(err.error.message === 'this title is already registered'){
            this.validationTitle = false
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

  passParameters(department){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        isEditDepartment: this.isEditDepartment,
        newDepartment: JSON.stringify(department)
      }
    };
    this.router.navigate([''], navigationExtras);
  }

  closeErrorBusy(){
    this.validationTitle = true;
  }

}




// saveDepartment(){
//   this.depService.departments.forEach(item => {
//     if(item.title !== this.department.title){
//       if(this.isEditDepartment === false){
//         this.depService.saveDepartment(this.department).subscribe(response => {
//           this.passParameters(response);
//          });
//       }
  
//       if(this.isEditDepartment === true){
//         this.depService.editDepartment(this.department).subscribe(response => {
//           console.log(response);
//           this.passParameters(response);
//          });
//       }
//     } else {
//       this.validationTitle = !this.validationTitle;
//     }
//   })
  
// }



// this.checkTitle = this.checkTitle.bind(this);
// checkTitle(control: FormControl): {[key: string]: boolean} {
//   console.log(control.value);
//   console.log(this.departments);
//   let isCheck = false;
//    // this.departments.forEach(item => {
//    //   if(item.title === control.value){
//    //     isCheck = true;
//    //   }
//    // })
//    if (isCheck) {
//      return {restrictedEmail: true}
//    }
//    return null
//  }




// saveDepartment(){   последний
//   this.depService.departments.forEach(item  => {
//     if(item.title === this.form.value.title){
//       this.validationTitle = false
//     }
//   })
//   if(this.validationTitle){
//     this.department = {...this.form.value}
//     if(this.isEditDepartment === false){
//       this.depService.saveDepartment(this.department).subscribe((response) => {
//         this.passParameters(response);
//       }, err => {
//         throw err
//         console.error(err);
//       });
//     }
//     if(this.isEditDepartment === true){
//       this.depService.editDepartment(this.department).subscribe(() => {
//         this.passParameters(this.department);
//       });
//     }
//   }
// }

// passParameters(department){
//   let navigationExtras: NavigationExtras = {
//     queryParams: {
//       isEditDepartment: this.isEditDepartment,
//       newDepartment: JSON.stringify(department)
//     }
//   };
//   this.router.navigate([''], navigationExtras);
// }
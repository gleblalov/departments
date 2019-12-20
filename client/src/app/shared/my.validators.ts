import {FormControl} from '@angular/forms'
import { EmployeeService } from './employee.service';

 export class MyValidators {
    constructor(
        private empService: EmployeeService,  
      ){}

// this.checkEmail = this.checkEmail.bind(this);
 // checkEmail(control: FormControl) : Promise<any> | Observable<any> {
  //   return new Promise( resolve => {
  //     this.empService.checkEmail(control).subscribe(res => {
  //       console.log('teeeeeeeeeeeeeeeeeeeest', res)
  //       if(res){
  //         resolve({emailError: true}) 
  //       } else {
  //         resolve(null)
  //       }
  //       });
  //     }) 
  //   }
  //  return new Observable( observer => {
  //     this.empService.checkEmail(control).subscribe(res => {
  //       console.log('teeeeeeeeeeeeeeeeeeeest')
  //       if(res){
  //         observer.next({emailError: true}) 
  //       } else {
  //         observer.next(null)
  //       }
  //     });
  //   }) 
// }
}

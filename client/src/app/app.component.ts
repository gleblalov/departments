import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from './shared/department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  
  constructor(
    private router: Router,
    private depService: DepartmentService,
    ) {}
  openListEmployees(){
    this.depService.departmentId = null;
    this.router.navigate(['employees']);
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentsComponent } from './list-departments/list-departments.component';
import { EditDepartmenComponent } from './edit-departmen/edit-departmen.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: ListDepartmentsComponent, children: [
    {path: 'edit-department', component: EditDepartmenComponent},
  ]},
  {path: 'employees', component: ListEmployeesComponent, children: [
    {path: 'edit-employee', component: EditEmployeeComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ListDepartmentsComponent } from './list-departments/list-departments.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { EditDepartmenComponent } from './edit-departmen/edit-departmen.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    ListDepartmentsComponent,
    ListEmployeesComponent,
    EditDepartmenComponent,
    EditEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

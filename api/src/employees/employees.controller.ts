import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee, } from '../model';
import { ObjectID } from 'typeorm';

@Controller('employee')
export class EmployeesController {

    constructor(private empService: EmployeesService) {}

    @Get()
    async getEmployees() {
        return await this.empService.getEmployees();
    } 

    @Get(':id')
    async getEmployeesForDepartment(@Param('id') id: ObjectID) {
        return await this.empService.getEmployeesForDepartment(id);
    }

    @Post()
    async addEmployee(@Body() employee: Employee) {
        return await this.empService.addEmployee(employee); 
    }

    @Put(':id')
    async changeEmployee(@Param('id') id: ObjectID, @Body() employee: Employee) {
        return await this.empService.changeEmployee(id, employee);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: ObjectID) {
        return this.empService.deleteEmployee(id);
    }

    @Get('test/:email')
    async checkEmail(@Param('email') email: string) {
        return await this.empService.checkEmail(email); 
    }
}

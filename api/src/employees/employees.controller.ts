import { Controller, Get, Post, Body, Put, Delete, Param, HttpStatus, Res } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee, } from '../model';
import { ObjectID } from 'typeorm';

@Controller('employee')
export class EmployeesController {

    constructor(private empService: EmployeesService) {}

    @Get()
    async getEmployees(@Res() res) {
        const result = await this.empService.getEmployees();

        if(result.length > 0){
            return res.status(HttpStatus.OK).send(result);
        }

        if(result.length === 0){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'Failed to get employees'
            });
        }
    } 

    @Get(':id')
    async getEmployeesForDepartment(@Res() res, @Param('id') id: ObjectID) {
        const result = await this.empService.getEmployeesForDepartment(id);

        if(result.length > 0){
            return res.status(HttpStatus.OK).send(result);
        }

        if(result.length === 0){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'Failed to get employees'
            });
        }
    }

    @Post()
    async addEmployee(@Res() res, @Body() employee: Employee) {
        const result = await this.empService.addEmployee(employee); 

        if(result !== null){
            return res.status(HttpStatus.OK).json({result});
        }
        if(result === null){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'this email is busy'
            });
        }
    }

    @Put(':id')
    async changeEmployee(@Res() res, @Param('id') id: ObjectID, @Body() employee: Employee) {
        const result = await this.empService.changeEmployee(id, employee);

        if(result !== null){
            return res.status(HttpStatus.OK).send();
        }
        if(result === null){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'this email is busy'
            });
        }
    }

    @Delete(':id')
    async deleteEmployee(@Res() res, @Param('id') id: ObjectID) {
        const result = await this.empService.deleteEmployee(id);

        if(result !== null){
            return res.status(HttpStatus.OK).send();
        }
        if(result === null){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'Employee was not deleted'
            });
        }
    }
}



// @Get('check/:email')
    //  checkEmail(@Param('email') email: string) {
    //     return  this.empService.checkEmail(email); 
    // }
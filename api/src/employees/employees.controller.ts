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

        return res.status(HttpStatus.OK).send(result);
    } 

    @Get(':id')
    async getEmployeesForDepartment(@Res() res, @Param('id') id: ObjectID) {
        const result = await this.empService.getEmployeesForDepartment(id);

         return res.status(HttpStatus.OK).send(result);
    }

    @Post()
    async addEmployee(@Res() res, @Body() employee: Employee) {
        this.empService.addEmployee(employee)
            .then((result) => res.status(HttpStatus.OK).json({result}))
            .catch((err) => this.sendErrorMessage(err, res));
    }

    @Put(':id')
    async changeEmployee(@Res() res, @Param('id') id: ObjectID, @Body() employee: Employee) {
        this.empService.changeEmployee(id, employee)
            .then(() => res.status(HttpStatus.OK).send())
            .catch((err) => this.sendErrorMessage(err, res));
    }

    @Delete(':id')
    async deleteEmployee(@Res() res, @Param('id') id: ObjectID) {
        this.empService.deleteEmployee(id)
            .then(() => res.status(HttpStatus.OK).send())
            .catch((err) => this.sendErrorMessage(err, res));
    }

    sendErrorMessage(err, res){
        return res.status(HttpStatus.NOT_FOUND).send({
            message: err.message
        });
    }
}



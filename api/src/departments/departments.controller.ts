import { Controller, Post, Body, Put, Param, Get, Req, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department, } from '../model';
import { ObjectID } from 'typeorm';

@Controller('department')
export class DepartmentsController {

    constructor(private depService: DepartmentsService) {}

    @Get()
    async getTasks() {
        return await this.depService.getDepartments();
    }  

    @Post()
    async addDepartment(@Body() department: Department) {
        return await this.depService.addDepartment(department);
    }

    @Put(':id')
    async changeDepartment(@Param('id') id: ObjectID, @Body() department: Department) {
        return await this.depService.changeDepartment(id, department);
    }

    @Delete(':id')
    async deleteDepartment(@Param('id') id: ObjectID) {
        return this.depService.deleteDepartment(id);
    }
}

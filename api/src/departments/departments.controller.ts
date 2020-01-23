import { Controller, Post, Body, Put, Param, Get, Req, Delete, HttpStatus, Res, NotFoundException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department, } from '../model';
import { ObjectID } from 'typeorm';

@Controller('department')
export class DepartmentsController {

    constructor(private depService: DepartmentsService) {}

    @Get()
    async getDepartments(@Res() res) {
        const result = await this.depService.getDepartments();
        
        return res.status(HttpStatus.OK).send(result);
    }  

    @Post()
    async addDepartment(@Res() res, @Body() department: Department) {
        const result = await this.depService.addDepartment(department);

        if(result !== null){
            return res.status(HttpStatus.OK).json({result});
        }
        if(result === null){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'this title is already registered'
            });
        }
        
    }

    @Put(':id')
    async changeDepartment(@Res() res, @Param('id') id: ObjectID, @Body() department: Department) {
        const result = await this.depService.changeDepartment(id, department);

        if(result !== null){
            return res.status(HttpStatus.OK).send();
        }
        if(result === null){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'this title is already registered'
            });
        }
    }

    @Delete(':id')
    async deleteDepartment(@Res() res, @Param('id') id: ObjectID) {
        const result = await this.depService.deleteDepartment(id);
        
        if(result !== null){
            return res.status(HttpStatus.OK).send();
        }
        if(result === null){
            return res.status(HttpStatus.NOT_FOUND).send({
                message: 'Department was not deleted'
            });
        }
    }
}

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
        this.depService.addDepartment(department)
            .then((result) => res.status(HttpStatus.OK).json({result}))
            .catch((err) => this.sendErrorMessage(err, res));        
    }

    @Put(':id')
    changeDepartment(@Res() res, @Param('id') id: ObjectID, @Body() department: Department) {
        this.depService.changeDepartment(id, department)
            .then(() => res.status(HttpStatus.OK).send())
            .catch((err) => this.sendErrorMessage(err, res));
    }

    @Delete(':id')
    deleteDepartment(@Res() res, @Param('id') id: ObjectID) {
        this.depService.deleteDepartment(id)
            .then(() => res.status(HttpStatus.OK).send())
            .catch((err) => this.sendErrorMessage(err, res));
    }

    sendErrorMessage(err, res){
        return res.status(HttpStatus.NOT_FOUND).send({
            message: err.message
        });
    }
}

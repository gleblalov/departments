import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { Departments, } from '../entities';
import { Department, } from '../model';

@Injectable()
export class DepartmentsService {
    
    constructor(
        @InjectRepository(Departments) private departmentsRepository: Repository<Departments>,
      ) { }

    async getDepartments(): Promise<Department[]> {
      return await this.departmentsRepository.find();
    }

    async addDepartment(department: Department): Promise<Department> {
      return await this.departmentsRepository.save(department);
    }

    async changeDepartment(id: ObjectID, department: Department): Promise<any>  {
      return await this.departmentsRepository.update(id, department);
    }

    async deleteDepartment(id: ObjectID) {
      return await this.departmentsRepository.delete(id);
    }
  
}

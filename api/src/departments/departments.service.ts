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
      const departments = await this.departmentsRepository.find();
      return departments
    }

    async addDepartment(department: Department): Promise<Department> {
       const foundDepartment = await this.departmentsRepository.findOne({
         where: {
           title: department.title
         }
       })

       if(!foundDepartment){
         const saveDepartment = await this.departmentsRepository.save(department);
         return saveDepartment
       } else {
         return null
       }
    }

    async changeDepartment(id: ObjectID, department: Department)  {
      const foundDepartment = await this.departmentsRepository.findOne({
        where: {
          title: department.title
        }
      })
    
      if(!foundDepartment){
        const result = await this.departmentsRepository.update(id, department);
        return result
      } 

      if(foundDepartment && foundDepartment.id == department.id){
        const result = await this.departmentsRepository.update(id, department);
        return result
      } 
      
      return null
    }

    async deleteDepartment(id: ObjectID) {
      const foundDepartment = await this.departmentsRepository.findOne(id)
      console.log(foundDepartment)

      if(foundDepartment){
        return  this.departmentsRepository.delete(id);
      } else {
        return null
      }
    }
  
}

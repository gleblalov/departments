import { Injectable } from '@nestjs/common';
import { Employees, } from '../entities';
import { Employee, } from '../model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employees) private employeesRepository: Repository<Employees>,
      ) { }

      async getEmployees(): Promise<Employee[]> {
        return await this.employeesRepository.find();
      }

      async getEmployeesForDepartment(id): Promise<Employee[]>{
        return await this.employeesRepository.find({
          where: {
            departmentID: `${id}`,
          }
        });
      }

      async addEmployee(employee: Employee): Promise<Employee> {
        return await this.employeesRepository.save(employee);
      }

      async changeEmployee(id: ObjectID, employee: Employee) {
        return await this.employeesRepository.update(id, employee);
      }

      async deleteEmployee(id: ObjectID) {
        return await this.employeesRepository.delete(id);
      }

      async checkEmail(email) {
        return await this.employeesRepository.findOne({
          where: {
            email: `${email}`,
          }
        });
      }
}

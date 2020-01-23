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
        const employees = await this.employeesRepository.find();
        return employees
      }

      async getEmployeesForDepartment(id): Promise<Employee[]>{
        const foundEmployees = await this.employeesRepository.find({
          where: {
            departmentID: `${id}`,
          }
        });

        return foundEmployees
      }

      async addEmployee(employee: Employee): Promise<Employee> {
        const employeeByEmail = await this.checkEmail(employee.email)

        if(!employeeByEmail){
          const savedEmployee = await this.employeesRepository.save(employee);
          return savedEmployee
        } else {
          return null
        }
        
      }

      async changeEmployee(id: ObjectID, employee: Employee) {
        const foundEmployees = await this.employeesRepository.findOne({
          where: {
            email: employee.email
          }
        })

        if(!foundEmployees){
          const result = await this.employeesRepository.update(id, employee);
          return result
        } 

        if(foundEmployees && foundEmployees.id == employee.id){
          const result = await this.employeesRepository.update(id, employee);
          return result
        } 
        
        return null
      }

      async deleteEmployee(id: ObjectID) {
        const foundEmployee = await this.employeesRepository.findOne(id)

        if(foundEmployee){
          return this.employeesRepository.delete(id);
        } else {
          return null
        }
      }

      async checkEmail(email) {
        const byEmail = await this.employeesRepository.findOne({
          where: {
            email: `${email}`,
          }
        });

        return byEmail
      }

      async deleteDepartmentInEmployee(id) {
        const emloyees = await this.employeesRepository.find({
          where: {
            departmentID: id
          }
        })
        const deleteEmp = await this.employeesRepository.remove(emloyees);
        emloyees.forEach( item => {
          item.departmentID = null
        })

        const saveEmp = await this.employeesRepository.save(emloyees)
        return saveEmp
      }
}

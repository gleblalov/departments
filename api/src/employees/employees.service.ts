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
        const foundEmployee = await this.foundByEmail(employee.email)

        if(!foundEmployee){
          const savedEmployee = await this.employeesRepository.save(employee);
          return savedEmployee
        }

        throw new Error('this email is already registered')
      }

      async changeEmployee(id: ObjectID, employee: Employee) {
        const foundEmployee = await this.foundByEmail(employee.email)

        if(!foundEmployee){
          const result = await this.employeesRepository.update(id, employee);
          return result
        } 

        if(foundEmployee && foundEmployee.id == employee.id){
          const result = await this.employeesRepository.update(id, employee);
          return result
        } 
        
        throw new Error('this email is already registered')
      }

      async deleteEmployee(id: ObjectID) {
        const foundEmployee = await this.employeesRepository.findOne(id)

        if(foundEmployee){
          return this.employeesRepository.delete(id);
        } 
        
        throw new Error('Employee was not deleted')
      }

      async foundByEmail(email) {
        const foundEmployee = await this.employeesRepository.findOne({
          where: {
            email: `${email}`,
          }
        });

        return foundEmployee
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

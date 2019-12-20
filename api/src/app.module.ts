import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentsController } from './departments/departments.controller';
import { EmployeesController } from './employees/employees.controller';
import { DepartmentsService } from './departments/departments.service';
import { EmployeesService } from './employees/employees.service';
import { Departments, Employees, } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://gleb:301195@clustertodo-f8edg.mongodb.net/departments',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TypeOrmModule.forFeature([Departments, Employees]),
  ],
  controllers: [AppController, DepartmentsController, EmployeesController],
  providers: [AppService, DepartmentsService, EmployeesService],
})
export class AppModule {}

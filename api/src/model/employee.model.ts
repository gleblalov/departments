import {IsString, MinLength, IsEmail, MaxLength, IsNotEmpty, IsDate, IsDateString} from "class-validator";

export class Employee {
    
    @IsString()
    id?: string
    
    @IsString()
    @IsNotEmpty()
    departmentID?: string
    
    @IsString()
    @IsNotEmpty()
    fname: string
    
    @IsString()
    @IsNotEmpty()
    lname: string
    
   
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsString()
    experience?: string
    
    @IsString()
    position?: string
    
    
    dateOfBirth?: Date
}
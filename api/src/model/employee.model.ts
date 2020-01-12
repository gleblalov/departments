import {IsString, MinLength, IsEmail, MaxLength, IsNotEmpty, IsDate} from "class-validator";

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
    
    email: string
    
    @IsString()
    experience?: string
    
    @IsString()
    position?: string
    
    
    dateOfBirth?: Date
}
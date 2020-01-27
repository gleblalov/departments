import {IsString, IsEmail, IsNotEmpty, NotContains, Length} from "class-validator";

export class Employee {
    
    id?: string
    
    @IsString()
    @IsNotEmpty({ message: 'Department must not be empty.'})
    departmentID?: string
    
    @IsString()
    @IsNotEmpty({ message: 'First name must not be empty.'})
    @Length(2, 20, { message: 'First name length must be in the range of 2 to 20.'})
    @NotContains(' ', {  message: 'First name must not contain a space.'})
    fname: string
    
    @IsString()
    @IsNotEmpty({ message: 'Last name must not be empty.'})
    @Length(3, 20, { message: 'Last name length must be in the range of 2 to 20.'})
    @NotContains(' ', {  message: 'Last name must not contain a space.'})
    lname: string
    
   
    @IsString()
    @IsNotEmpty({ message: 'Email must not be empty.'})
    @IsEmail()
    email: string
    
    @IsString()
    experience?: string
    
    @IsString()
    @IsNotEmpty({ message: 'Position must not be empty.'})
    position?: string
    
    dateOfBirth?: Date
}
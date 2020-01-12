import {IsString, MinLength, IsEmail, MaxLength, IsNotEmpty} from "class-validator";

export class Department {
    
    @IsString()
    id: string;

    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @MaxLength(200)
    describe?: string;
}
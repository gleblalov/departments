import {IsString, MinLength, MaxLength, IsNotEmpty, NotContains, } from "class-validator";


export class Department {
    
    id?: string;

    @IsString()
    @MinLength(2, {message: 'The name must be more than two characters.'})
    @MaxLength(15, {message: 'Title exceeds character limit.'})
    @IsNotEmpty({ message: 'Title must not be empty.'})
    @NotContains(' ', {  message: 'Title must not contain a space.'})
    title: string;

    @IsString()
    @MaxLength(150, {message: 'Title exceeds character limit.'})
    describe?: string;
}
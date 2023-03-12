import { IsNotEmpty, IsEmail, IsString, IsNumber, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
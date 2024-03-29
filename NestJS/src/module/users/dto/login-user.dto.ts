import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}
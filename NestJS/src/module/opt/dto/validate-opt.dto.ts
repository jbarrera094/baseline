import { IsNotEmpty, IsNumber } from 'class-validator';
export class ValidateOptDto {
    @IsNotEmpty()
    cellphone: number;

    @IsNotEmpty()
    @IsNumber()
    code: number;
}
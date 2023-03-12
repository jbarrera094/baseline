import { IsNotEmpty } from 'class-validator';
export class CRUDOptDto {
    @IsNotEmpty()
    cellphone: number;
}
import { IsNotEmpty, IsString, IsNumber} from 'class-validator';
export class CreateFeesDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly value: number;

    @IsString()
    @IsNotEmpty()
    readonly key: string;
}
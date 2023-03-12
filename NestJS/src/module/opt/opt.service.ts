import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApisService } from '../apis/apis.service';
import { CRUDOptDto } from './dto/crud-opt.dto';
import { ValidateOptDto } from './dto/validate-opt.dto';
import { Opt } from './interface/opt.interface';

@Injectable()
export class OptService {
    constructor(
        @InjectModel('Opt')
            private optModel: Model<Opt>,
        private apisService: ApisService
    ){}

    async create(createOptDto: CRUDOptDto): Promise<any>{
        const {cellphone} = createOptDto;

        //  Generate OPT Code
        let code = this.generateRandomIntegerInRange(1000, 9999);

        // Send OPT
        this.apisService.sendOPT(code, cellphone);

        // Save DB
        const addOpt = new this.optModel({cellphone, code});
        const data: any = await addOpt.save();

        return { 
            statusCode: HttpStatus.OK,
            message: 'Opt success.',
            data
        };
        
    }

    async update(updateOptDto: CRUDOptDto): Promise<any>{
        const {cellphone} = updateOptDto;

        //  Generate OPT Code
        let code = this.generateRandomIntegerInRange(1000, 9999);

        // Send OPT
        this.apisService.sendOPT(code, cellphone);

        // Update DB
        let data = this.optModel.updateOne({"cellphone": cellphone},{"$set":{"code": code}})


        return { 
            statusCode: HttpStatus.OK,
            message: 'Opt success.',
        };
    }

    async send(sendOptDto: CRUDOptDto): Promise<any>{
        const {cellphone} = sendOptDto;

        let register = await this.optModel.findOne({cellphone: cellphone});
        
        // IF null, no found cellphone number in data base
        if(!register){
            this.create(sendOptDto);
        }else{
            this.update(sendOptDto);
        }

        return { 
            statusCode: HttpStatus.OK,
            message: 'Opt success.',
        };
    }

    async validate(validateOptDto: ValidateOptDto): Promise<any>{
        const {cellphone, code} = validateOptDto;

        let register = await this.optModel.findOne({cellphone: cellphone});

        // IF null, no found cellphone number in data base
        if(!register){
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'No Found Cellphone Number',
            }
        }else{
            if(register.code === code){
                return {
                    statusCode: HttpStatus.OK,
                    message: 'OPT Accepted.'
                }
            } else {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Incorrect OPT'
                }
            }
        }
    }

    generateRandomIntegerInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

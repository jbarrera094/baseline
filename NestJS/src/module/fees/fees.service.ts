import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFeesDto } from './dto/create-fees.dto';
import { Model } from 'mongoose';
import { Fees } from './interface/fees-interface';

@Injectable()
export class FeesService {
    
    constructor(
        @InjectModel('Fees')
            private feesModel: Model<Fees>,
    ){}

    async create(createFeesDto: CreateFeesDto): Promise<any>{
        const {name, description, value, key} = createFeesDto;
        const createdFees = new this.feesModel(createFeesDto);

        const addFees = new this.feesModel({name, description, value, key});
        const data: any = await createdFees.save();

        return {
            statusCode: HttpStatus.OK,
            message: 'Fees success.',
            data
        };
        
    }

    async getFeesKey(key: String): Promise<any>{
        if (!key) {
            throw new BadRequestException('Id key must be sent');
        }

        const data = await this.feesModel.findOne({key});

        if(data == null){
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: "Fees not found."
            });
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Get Fees.',
            data
        };


    }

    async getFeesAll(): Promise<any>{

        const data = await this.feesModel.find();

       
        return {
            statusCode: HttpStatus.OK,
            message: 'Get Fees All',
            data
        };
    }
}

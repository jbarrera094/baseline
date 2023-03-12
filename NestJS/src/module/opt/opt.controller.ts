import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CRUDOptDto } from './dto/crud-opt.dto';
import { ValidateOptDto } from './dto/validate-opt.dto';
import { OptService } from './opt.service';

@Controller('opt')
export class OptController {
    constructor(private _optservice: OptService){}

    @Post('create')
    async create(@Body() createOptDto: CRUDOptDto){
        return await this._optservice.create(createOptDto);
    }

    @Patch('update')
    async update(@Body() updateOptDto: CRUDOptDto){
        return await this._optservice.update(updateOptDto)
    }

    @Patch('send')
    async send(@Body() sendOptDto: CRUDOptDto){
        return await this._optservice.send(sendOptDto)
    }

    @Post('validate')
    async validate(@Body() validateOptDto: ValidateOptDto){
        return await this._optservice.validate(validateOptDto);
    }
}

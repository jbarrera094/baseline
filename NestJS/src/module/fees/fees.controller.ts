import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeesDto } from './dto/create-fees.dto';
import { FeesService } from './fees.service';

@Controller('fees')
export class FeesController {
    constructor(
        private readonly _feesService: FeesService,
    ) {
    }

    @Post('create')
    @UseGuards(AuthGuard())
    async createUser(@Body() createFeesDto: CreateFeesDto){
        const createFees = await this._feesService.create(createFeesDto);
        return createFees;
    }

    @Get('getFeesKey/:key')
    async getFeesKey(@Param('key', ValidationPipe) key: String){
        const getFees = await this._feesService.getFeesKey(key);
        return getFees;
    }

    @Get()
    async getFeesAll(){
        const getFeesAll = await this._feesService.getFeesAll();
        return getFeesAll;
    }
}

import { Controller, Get, Post } from '@nestjs/common';
import { ApisService } from './apis.service';

@Controller('apis')
export class ApisController {
    constructor(private apisService: ApisService){}

    @Get('btc')
    async getBTC(){
        return await this.apisService.getBTCPrice();
    }

    @Get('cop')
    async getCOP(){
        return await this.apisService.getCOPPrice();
    }

    @Post('opt')
    async sentOPT(){
        return await this.apisService.sendOPT("202", '+573227089267');
    }

}

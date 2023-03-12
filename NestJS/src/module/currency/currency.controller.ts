import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';


@Controller('currency')
export class CurrencyController {
    constructor(private currencyService: CurrencyService){}

    @Get('btc')
    async getBTC() {
        return await this.currencyService.getBTCPrice();
    }

    @Get('cop')
    async getCOP() {
        return await this.currencyService.getCOPPrice();
    }

    @Get('amount')
    async getAmount(@Query('id') idFee){
        return await this.currencyService.getAmount(idFee);
    }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { ApisService } from '../apis/apis.service';
import { FeesService } from '../fees/fees.service';

@Injectable()
export class CurrencyService {
    constructor(private apisService: ApisService, 
        private feesService: FeesService){}

    async getBTCPrice() {
        let btcPrice = await this.apisService.getBTCPrice();
        let usd = btcPrice.BTC.USD;

        // Get fee value for Fee franchisee
        let FF = await this.feesService.getFeesKey('FF');
        // Get fee value for Fee Exchange
        let FE = await this.feesService.getFeesKey('FE');
        // Get fee value for Fee Business
        let FB = await this.feesService.getFeesKey('FB');
        // get total Feed, add 100%
        let totalFeed =  FF.data.value + FE.data.value + FB.data.value + 1;

        let cop = await this.getCOPPrice();
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Get BTC Price in COP more 6 percent.',
            data: {
                BTC: 1,
                COP_raw: (usd * cop).toFixed(2),
                COP: (usd * totalFeed * cop).toFixed(2)
            }
        };
    }

    async getAmount(idFee){
        let cop = await this.getCOPPrice();
        let Fee = await this.feesService.getFeesKey(idFee);
        let amount = Math.floor(cop * Fee.data.value / 10000);
        return {
            statusCode: HttpStatus.OK,
            message: 'Get required amount .',
            data: {
                Fee: idFee,
                COP: amount * 10000
            }
        };
    }

    async getCOPPrice(){
        return await this.apisService.getCOPPrice();
    }
}

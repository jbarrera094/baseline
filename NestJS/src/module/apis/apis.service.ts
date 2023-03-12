import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { Configuration } from '../../config/config.keys';

const axios = require("axios");
const FormData = require('form-data');

@Injectable()
export class ApisService {

    constructor(
        private readonly _configService: ConfigService,
        ) {}

    async getBTCPrice() {

        try {
            const cryptos = "BTC"; // se colocan las criptomonedas separadas por coma
            let res = await axios({
                method: 'get',
                url: `${this._configService.get(Configuration.URL_API_CRYPTO_EXCHANGE)}/data/pricemulti?fsyms=${cryptos}&tsyms=COP,USD,BTC`
            });
        
            let data = res.data;
            return data;
        } catch (error) {
            console.log(error.response); // this is the main part. Use the response property from the error object
            return error.response;
        }
        
    }

    async getCOPPrice() {

        try {
            let res = await axios({
                method: 'get',
                url: `${this._configService.get(Configuration.URL_API_USD_EXCHANGE)}/latest?apikey=${this._configService.get(Configuration.KEY_API_USD_EXCHANGE)}`
            });
        
            let cop = res.data.rates.COP;
            return cop;
        } catch (error) {
            console.log(error.response); // this is the main part. Use the response property from the error object
            return error.response;
        }
        
    }

    async sendOPT(code, cellphone){
        const formData = new FormData();
        formData.append('Body', `Tu codigo de acceso es: ${code}`);
        formData.append('From', this._configService.get(Configuration.PHONE_SERVER_API_TWILIO));
        formData.append('To', cellphone);

        var config = {
            method: 'post',
            url: 'https://api.twilio.com/2010-04-01/Accounts/ACf8480abae66bafa13f5044fa6be14d1b/Messages',
            auth: {
                username: this._configService.get(Configuration.ACCOUNT_API_TWILIO_SID),
                password: this._configService.get(Configuration.KEY_API_TWILIO_TOKEN)
            },
            headers: { 
                ...formData.getHeaders()
            },
            data : formData
        };
        
        try{
            let res = await axios(config);

            return JSON.stringify(res.data);
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
}

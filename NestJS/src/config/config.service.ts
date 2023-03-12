import * as fs from 'fs';
import { parse } from 'dotenv';
import { Configuration } from './config.keys';
const Web3 = require('web3');

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env';
            const existsPath = fs.existsSync(envFilePath);

            if (!existsPath) {
                console.log('.env file does no exists');
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
            };
        }
    }

    get(key: string ): string {
        return this.envConfig[key];
    }

    serviceWeb3(currency: string){
            let url;
            let red;
        switch(currency){
            case 'MAINNET':
                red = 'mainnet';
                url = this.get(Configuration.MAINNET);
            break;
            case 'ROPSTEN':
                red = 'ropsten';
                url = this.get(Configuration.ROPSTEN);
            break;
            case 'RINKEBY':
                red = 'rinkeby';
                url = this.get(Configuration.RINKEBY);
            break;
        }

        const web3 = new Web3(new Web3.providers.WebsocketProvider(url));

        return {
            red: red,
            url: url,
            web3: web3,
        }
    }
}
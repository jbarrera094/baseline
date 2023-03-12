
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service'
import { Configuration } from './config/config.keys';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './module/token/token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FeesModule } from './module/fees/fees.module';
import { ApisModule } from './module/apis/apis.module';
import { CurrencyModule } from './module/currency/currency.module';
import { OptModule } from './module/opt/opt.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/santo_atm'),
    AuthModule,
    ConfigModule,
    MailModule,
    TokenModule,
    FeesModule,
    ApisModule,
    CurrencyModule,
    OptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}

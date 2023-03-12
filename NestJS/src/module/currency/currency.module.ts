import { Module } from '@nestjs/common';
import { ApisModule } from '../apis/apis.module';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { FeesModule } from '../fees/fees.module';

@Module({
  imports: [
    ApisModule,
    FeesModule
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}

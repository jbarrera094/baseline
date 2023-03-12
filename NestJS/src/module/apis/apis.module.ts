import { Module } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';

@Module({
  controllers: [ApisController],
  providers: [ApisService, ConfigService],
  exports: [ApisService]
})
export class ApisModule {}

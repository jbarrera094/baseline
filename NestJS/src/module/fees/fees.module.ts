import { Module } from '@nestjs/common';
import { FeesService } from './fees.service';
import { FeesController } from './fees.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { FeesSchema } from './fees.schema';

@Module({
  providers: [FeesService],
  controllers: [FeesController],
  imports:[
    MongooseModule.forFeature([{name: 'Fees', schema: FeesSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports:[FeesService]
})
export class FeesModule {}

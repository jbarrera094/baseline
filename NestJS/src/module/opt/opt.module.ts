import { Module } from '@nestjs/common';
import { OptService } from './opt.service';
import { OptController } from './opt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { OptSchema } from './opt.schema';
import { ApisModule } from '../apis/apis.module';

@Module({
  providers: [OptService],
  imports:[
    ApisModule,
    MongooseModule.forFeature([{name: 'Opt', schema: OptSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [OptController]
})
export class OptModule {}

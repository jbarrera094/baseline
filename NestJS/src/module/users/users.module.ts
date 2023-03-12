import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../../mail/mail.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    MailModule,
    TokenModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

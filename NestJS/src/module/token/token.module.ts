import { Module } from '@nestjs/common';
// import { TokensController } from './token.controller';
import { TokenService } from './token.service';
import { TokenSchema } from './token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensController } from './token.controller';
@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Token', schema: TokenSchema}])
    ],
    controllers: [TokensController],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
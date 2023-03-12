import { Injectable } from '@nestjs/common';
import { Token } from './token.interface';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokenDto } from './dto/delete-token.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TokenService {
    constructor(@InjectModel('Token') 
        private TokenModel: Model<Token>) {}
    
    async create(createTokenDto: CreateTokenDto) {
        // Create new token
        let createdToken = new this.TokenModel(createTokenDto);
        return await createdToken.save();
    }

    async remove(deleteTokenDto: DeleteTokenDto) {
        // Delete register token      
        let Token = await this.findOneByToken(deleteTokenDto)
        return await Token.delete();
    }

    async findOneByToken(token): Model<Token> {
        return await this.TokenModel.findOne({token: token});
    }

    async findEmailByToken(token){{
        let fulltoken = await this.findOneByToken(token);
        return fulltoken.email;
    }}
}
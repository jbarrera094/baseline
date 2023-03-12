import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from '../../mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { TokenService } from '../token/token.service';
import { UserEntity } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectModel('User')
        private userModel: Model<User>,
        private mailService: MailService,
        private tokensService: TokenService) {}

    async create(createUserDto: CreateUserDto) {

        const token = Math.floor(1000 + Math.random() * 9000).toString();
        let createdUser = new this.userModel(createUserDto);
        
        await this.tokensService.create({email: createUserDto.email, token: token});
        await this.mailService.sendUserConfirmation(createUserDto, token);

        let user: any = await createdUser.save();
        
        return {statusCode: 200, message:"User create",data: new UserEntity({
            id: user.id,
            email: user.email,
            name: user.name,
        })}
    }

    async findOneByEmail(email): Model<User> {
        return await this.userModel.findOne({email: email});
    }

    async userActivate(email: string){
        return this.userModel.updateOne({"email": email},{"$set":{"confirmed": true}})
    }
}

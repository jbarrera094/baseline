import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeleteTokenDto } from '../token/dto/delete-token.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/wt-payload.interface';
import { TokenService } from '../token/token.service';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokensService:  TokenService,
    ){}

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
        
        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
    
                if(!err && isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));
                } else {
                    resolve({
                        statusCode: 401,
                        // it would be a vulnerability if the error is said to be the password
                        message:'Please validate your login credentials',
                    })
                }
    
            });

        });

    }
    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }


    createJwtPayload(user){
        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            statusCode: 200,
            message:'User login',
            expiresIn: 3600,
            token: jwt,
            data: new UserEntity({
                id: user.id,
                email: user.email,
                name: user.name,
            })
        }

    }

    async validateUserActivated(loginAttempt: LoginUserDto) {

        // This will be used for validate activated acount in login
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
        
        return new Promise((resolve) => {
            // If user exists
            if(!userToAttempt){
                // get the error code 400 as unregistered user.
                throw new UnauthorizedException("Please validate your login credentials");
            }

            // Check the activated for this email acount
            let check = userToAttempt.checkActivated();
            if (check){
                resolve({
                    statusCode: 200,
                    message:'Account activated',
                }); 
            }else{
                throw new UnauthorizedException("Account not activated");
            }
        });

    }

    async confirmUserActivated(deleteTokenDto: DeleteTokenDto) {
        // Email for this token
        let email = await this.tokensService.findEmailByToken(deleteTokenDto);
        // Activate User
        await this.usersService.userActivate(email);
        // Delete token
        await this.tokensService.remove(deleteTokenDto);
        // Login User
        let userToAttempt = await this.usersService.findOneByEmail(email);
        return new Promise((resolve) => {
            resolve(this.createJwtPayload(userToAttempt));
        });
    }

}


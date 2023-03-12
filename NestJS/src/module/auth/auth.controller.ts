import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { DeleteTokenDto } from '../token/dto/delete-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login') 
    async login(@Body() loginUserDto: LoginUserDto){
        await this.authService.validateUserActivated(loginUserDto);
        return await this.authService.validateUserByPassword(loginUserDto);
    }

    // Validate if user activated
    async UserActivated(loginUserDto: LoginUserDto){
        return await this.authService.validateUserActivated(loginUserDto);
    }

    //confirmar GET
    @Get('confirm')
    async confirm(@Query('token') deleteTokenDto: DeleteTokenDto){
        
        return await this.authService.confirmUserActivated(deleteTokenDto);
    }
    
}

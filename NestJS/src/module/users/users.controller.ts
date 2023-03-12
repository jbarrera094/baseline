import { Controller, Get, Post, Body, UseGuards, Patch, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}
    
    @Post('create') 
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute(){
        return {
            message: 'You did it!'
        }
    }

    @Patch('activate')
    async activate(@Query('email') email: string) {
        return await this.usersService.userActivate(email);
    }
}

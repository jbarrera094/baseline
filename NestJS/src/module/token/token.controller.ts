import { Controller, Post, Delete, Body, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { DeleteTokenDto } from './dto/delete-token.dto';

@Controller('token')
export class TokensController {
    
    constructor(private tokensService: TokenService) {}
    
    @Post('create') 
    async create(@Body() createTokenDto: CreateTokenDto) {
        return await this.tokensService.create(createTokenDto);
    }
    
    @Delete('delete') 
    async delete(@Query('token') deleteTokenDto: DeleteTokenDto) {
        return await this.tokensService.remove(deleteTokenDto);
    }
}
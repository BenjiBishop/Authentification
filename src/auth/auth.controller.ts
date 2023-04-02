import { Controller, Body, Delete, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refreshToken.dto';
import RefreshToken from './refresh-token';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}
    @Post('login')
    async login (@Req() request, @Ip() ip : string, @Body() body : LoginDto ) {
        return this.authService.login(body.email, body.password, {
            ipAdress: ip,
            userAgent : request.headers['user-agent']
        })

    }
    @Post('refresh')
    async refreshToken (@Body() body : RefreshTokenDto ) {
        return this.authService.refresh(body.refreshToken);
    }

    @Delete('delete') 
    async logout(@Body() body : RefreshTokenDto ) {
        return this.authService.logout(body.refreshToken)
    }
}

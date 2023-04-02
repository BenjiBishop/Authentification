import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gards/jwt-auth.guard';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}
    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@Req() request ) {
        const userId = request.user.userId;
        return this.userService.findOne(userId);
    }
}

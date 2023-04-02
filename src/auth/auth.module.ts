import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategie } from './strategies/jwt.strategie';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategie],
  imports : [UsersModule]
})
export class AuthModule {}

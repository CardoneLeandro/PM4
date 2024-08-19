import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { U_repository } from 'src/users/repository/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, U_repository],
})
export class AuthModule {}

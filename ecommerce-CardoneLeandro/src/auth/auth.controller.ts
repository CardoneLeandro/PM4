import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DTOValidationPipe } from '../common/pipes/DTO-Validation.pipe';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthHeaderGuard } from './guard/auth-headers.guard';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
  constructor(private readonly authSv: AuthService) {}

  @Post('signin')
 
  @UsePipes(new DTOValidationPipe())

  async singIn(@Body() DTO: LoginUserDTO) {
    try {
      const user = await this.authSv.validateUser(DTO.email);
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(DTO.password, user.password);
      if(!isPasswordValid){
        throw new BadRequestException('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('An error occurred during sign-in');
    }
  }
}

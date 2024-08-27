import { Controller, Post, Body, BadRequestException, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomValidationPipe } from '../security/pipes/login-user.pipe';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSv: AuthService) {}

  @Post('signin')
  @UsePipes(new CustomValidationPipe())
  async singIn(@Body() DTO:LoginUserDTO) {
    try {
      const user = await this.authSv.validateUser(DTO.email);
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      if (user.password !== DTO.password) {
        throw new BadRequestException('Invalid credentials');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('An error occurred during sign-in');
    }
  }
}

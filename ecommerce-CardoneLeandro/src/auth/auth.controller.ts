import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO as sDTO }from './dto/signIn.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authSv: AuthService) {}

  @Post('signin')
  async singIn(@Body() DTO: sDTO) {
    const {eMail, Password} = DTO
    if(!eMail || !Password){
      throw new BadRequestException('All fields are required')
    }
    try {
      const user = await this.authSv.validateUser(eMail, Password)
      if(!user) {
        throw new BadRequestException('Invalid credentials')
      }
      return this.authSv.loginUser(user)

    } catch (error) { 
      console.error(error)  
    }
  }

}

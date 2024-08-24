import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO as DTO }from './dto/signIn.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authSv: AuthService) {}

  @Post('signin')
  async singIn(@Body() email:string, password:string) {
    if(!email || !password){
      throw new BadRequestException('All fields are required')
    }
    try {
      const user = await this.authSv.validateUser(email)
      if(!user) {
        throw new BadRequestException('Invalid credentials')
      }
      if(user.password !== password) {
        throw new BadRequestException('Invalid credentials')}

        return user
    } catch (error) { 
      console.error(error)  
    }
  }
}

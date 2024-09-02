import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { UserPasswordEncripInterceptor } from 'src/auth/interceptor/user-passwordEncrip.interceptor';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DeletePassordOnResponseInterceptor } from './interceptor/delPassOnResp.interceptor';
import { encriptPasswordCompare } from 'src/utils/encript-passwordCompare.util';
import { addJWTInterceptor } from './interceptor/addJWT.interceptor';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSv: AuthService,
    private readonly userSv: UsersService,
  ) {}

  @Post('signin')
  @UsePipes(new DTOValidationPipe())
  @UseInterceptors(DeletePassordOnResponseInterceptor)
  @UseInterceptors(addJWTInterceptor)
  async singIn(@Body() DTO: LoginUserDTO) {
    try {
      console.log('CARDONE =========> authController IN DTO', DTO);
      const user = await this.authSv.validateUser(DTO.email);
      if (
        !user ||
        (user && (await encriptPasswordCompare(user, DTO.password)) === false)
      ) {
        throw new BadRequestException('Invalid credentials');
      }
      console.log('CARDONE =========> authController OUT USER', user);
      return user;
    } catch (error) {
      console.log('CARDONE =========> authController ERROR', error);
      console.error(error);
      throw new BadRequestException('An error occurred during sign-in');
    }
  }

  // ==>> this path replace /users@Post
  @Post('signup')
  @UseInterceptors(UserPasswordEncripInterceptor)
  @UseInterceptors(DeletePassordOnResponseInterceptor)
  async singUp(@Body() DTO: CreateUserDto): Promise<Partial<User>> {
    try {
      console.log('CARDONE =========> authController', DTO);
      const user = await this.userSv.create(DTO);
      return user;
    } catch (error) {
      throw new BadRequestException('An error occurred during sign-up');
    }
  }
}

import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  UseInterceptors,
  Put,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { UserPasswordEncripInterceptor } from 'src/auth/interceptor/user-passwordEncrip.interceptor';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DeletePassordOnResponseInterceptor } from './interceptor/delPassOnResp.interceptor';
import { encriptPasswordCompare } from 'src/common/utils/encript-passwordCompare.util';
import { addJWTInterceptor } from './interceptor/addJWT.interceptor';
import { RemoveRoleInterceptor } from 'src/common/interceptor/remove-role.interceptor';
import { AuthHeaderGuard } from './guard/auth-headers.guard';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { UUIDExtended } from 'typeorm/driver/mongodb/bson.typings';
import { UUID } from 'crypto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSv: AuthService,
    private readonly userSv: UsersService,
  ) {}





  @Post('signin')
  @UsePipes(new DTOValidationPipe()) //?     ||=====> PIPE DE VALIDACION DEL DTO
  @UseInterceptors(
  RemoveRoleInterceptor,                      //!     ||=====> INTERCEPTOR DE ELIMINAR EL ROL DEL USUARIO
  DeletePassordOnResponseInterceptor,         //!     ||=====> INTERCEPTOR DE ELIMINAR EL PASSWORD EN LA RESPUESTA
  addJWTInterceptor)                          //!     ||=====> INTERCEPTOR DE AGREGAR EL TOKEN EN LA RESPUESTA
  async singIn(@Body() DTO: LoginUserDTO) {
    try {
      const user = await this.authSv.validateUser(DTO.email);
      if (
        !user ||
        (user && (await encriptPasswordCompare(user, DTO.password)) === false) //*     SI NO EXISTE USER O SI LAS CONTRASEÑAS NO COINCIDEN ROMPE (LAS CONTRASEÑAS SE COMPARAN ENCRIPTADAS)
      ) {
        throw new BadRequestException('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('An error occurred during sign-in');
    }
  }


  @Post('signup') /* este path reemplazo a /users/create */
  @UseInterceptors(
    UserPasswordEncripInterceptor,          //!     ||=====> INTERCEPTOR ENCARGADO DE ENCRIPTAR EL PASSWORD DEL USUARIO AL MOMENTO DE REGISTRARLO
    DeletePassordOnResponseInterceptor,     //!     ||=====> INTERCEPTOR DE ELIMINAR EL PASSWORD EN LA RESPUESTA
    RemoveRoleInterceptor)                  //!     ||=====> INTERCEPTOR DE ELIMINAR EL ROL DEL USUARIO EN LA RESPUESTA
  async singUp(@Body() DTO: CreateUserDto): Promise<Partial<User>> {
    try {
      const user = await this.userSv.create(DTO);
      return user;
    } catch (error) {
      throw new BadRequestException('An error occurred during sign-up');
    }
  }




  //?     RUTA CREADA PARA HACER PRUEBAS DE SEGURIDAD
  @Put('admin/:id')
  @UseGuards(AuthHeaderGuard)
  @UseInterceptors(addJWTInterceptor)
  async adminUpdate(
    @Param('id', new IsUUIDPipe()) id: UUID,
  ): Promise<User | null> {
    try {
      const updateUser: User | null = await this.userSv.adminUpdate(id);
      if (!updateUser) {
        throw new BadRequestException(
          'An error occurred during the update process',
        );
      }
      return updateUser;
    } catch (e) {
      throw new BadRequestException(
        `An error occurred during the process: ${e.message}`,
      );
    }
  }
}

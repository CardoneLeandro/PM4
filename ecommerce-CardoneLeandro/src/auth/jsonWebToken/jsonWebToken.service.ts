//*     SERVICIO DE CREACION DE JSON WEB TOKEN

<<<<<<< HEAD
=======

>>>>>>> 43f08683d353a78355d56b7f75990ed2bfa75512
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JsonWebTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //*     PARAMETROS PARA LA GENERACION DE JSON WEB TOKEN
  async generateJwt(user: any): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role, //! ==> INCLUCION DEL ROL
    };
    const secret = this.configService.get<string>('jwt.secret');
    const signOptions = this.configService.get<object>('jwt.signOptions');
    return this.jwtService.sign(payload, { secret, ...signOptions });
  }
}

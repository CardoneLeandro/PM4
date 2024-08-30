// CADUCADO
// UTILIZADO PARA "VALIDAR" EN ACCESO A DETERMINADAS RUTAS.
// REEMPLAZADO POR

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserLoginGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization missing');
    }

    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid Authorization format');
    }

    const [email, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');

    return this.validateUser(email, password);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const existingUser = await this.usersService.getUserByEmail(email);
    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (existingUser.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return true;
  }
}

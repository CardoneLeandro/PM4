//implementar en las rutas
// todas excepto => 'users/post' | 'products/get' &  'products/get:id'

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//==>AuthHeaderGuard ahora se extiende de la clase de AuthGuard por lo que hereda todos sus metodos
//==> ('jwt') es el nombre de la estrategia de autenticacion
export class AuthHeaderGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o inválido');
    }

    return super.canActivate(context);
  }
}

/*
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable, retry } from 'rxjs';
import { JsonWebTokenService } from '../jsonWebToken/jsonWebToken.service';

function validateLogin(
  req: Request,
): boolean | Promise<boolean> | Observable<boolean> {
  // instancia el header "authorization"
  const auth = req.headers['authorization'];
  // verifica que el header exista y que comience con Basic
  if (!auth || !auth.startsWith('Basic ')) {
    return false;
  }

  //instancia authBase64
  //se extran las credenciales del header, eliminando el prefijo "basic"
  const authBase64 = auth.split(' ')[1];
  //se decodifica la cadena de texto en base64 para obtener el string de credenciales
  const authCredentials = Buffer.from(authBase64, 'base64').toString('ascii');
  // extrae user y password del string de credenciales
  const [user, password] = authCredentials.split(':');
  if (!user || !password) {
    return false;
  }
  // IMPLEMENTAR LIBRERIA PARA VERIFICAR EMAIL.
  return true;
}
@Injectable()
export class AuthHeaderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return validateLogin(request);
  }
}
*/

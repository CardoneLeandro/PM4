//implementar en las rutas
// todas excepto => 'users/post' | 'products/get' &  'products/get:id'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable, retry } from 'rxjs';

function validateLogin(req: Request):boolean | Promise<boolean> | Observable<boolean> {
  const auth = req.headers['authorization']
  if(!auth || !auth.startsWith('Basic ')) {return false}

  const authBase64 = auth.split(' ')[1]
  const authCredentials = Buffer.from(authBase64, 'base64').toString('ascii')
  const [user, password] = authCredentials.split(':')
  if (!user || !password) {return false}
  // IMPLEMENTAR LIBRERIA PARA VERIFICAR EMAIL.
  return true
}
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> |Observable<boolean>{
    const request = context.switchToHttp().getRequest<Request>();
    return validateLogin(request);
  }
}

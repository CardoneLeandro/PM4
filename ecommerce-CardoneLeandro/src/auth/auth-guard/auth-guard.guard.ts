import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateLogin(req: Request) {
  const Info = req.headers.authorization;
  console.log('GUARD', Info);
  const [user, password] = Info.split(':');
  if (!Info) return false;
  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isValid = validateLogin(request);
    return isValid;
  }
}

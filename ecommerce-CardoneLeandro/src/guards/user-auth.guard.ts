import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


function validateRequest(request) {
  const token = request.headers['token'];
  console.log(token);
  return token === '1234';
  
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> 
  {
    const request = context.switchToHttp().getRequest();
    console.log("ESTA ES LA REQUEST", request);
    if (!validateRequest(request)) {
      return false;
    }
    return true;
  }
}

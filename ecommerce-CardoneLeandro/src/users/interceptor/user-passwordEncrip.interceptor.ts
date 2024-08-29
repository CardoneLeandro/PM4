import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordEncripInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body.password = bcrypt.hashSync(request.body.password, 10);
    return next.handle();
  }
}

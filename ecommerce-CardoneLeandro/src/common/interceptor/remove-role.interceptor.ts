import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class RemoveRoleInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.role) {
          delete data.role;
          return data;
        }
      }),
    );
=======
import { Observable, map } from 'rxjs';

@Injectable()
export class RemoveRoleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (url !== '/users') {
      return next.handle().pipe(
        map((data) => {
          if (Array.isArray(data)) {
            return data.map((item) => {
              const { role, ...rest } = item;
              return rest;
            });
          } else {
            const { role, ...rest } = data;
            return rest;
          }
        }),
      );
    }
    return next.handle();
>>>>>>> 43f08683d353a78355d56b7f75990ed2bfa75512
  }
}

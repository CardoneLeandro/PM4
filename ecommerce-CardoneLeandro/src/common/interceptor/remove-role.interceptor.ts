import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
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
  }
}

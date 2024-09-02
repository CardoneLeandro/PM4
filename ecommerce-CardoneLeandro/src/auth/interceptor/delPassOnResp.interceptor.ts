import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DeletePassordOnResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.password) {
          delete data.password;
          console.log(
            'CARDONE =========> deletePassordOnResponseInterceptor DATA',
            data,
          );
          return data;
        }
      }),
    );
  }
}

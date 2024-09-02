import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JsonWebTokenService } from '../jsonWebToken/jsonWebToken.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class addJWTInterceptor implements NestInterceptor {
  constructor(private readonly jwtSv: JsonWebTokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return (
      console.log('CARDONE =========> addJWTInterceptor IN'),
      next.handle().pipe(
        map(async (user) => {
          try {
            console.log('CARDONE =========> addJWTInterceptor IN TRY ', user);
            // ==> then gereate token
            const token = await this.jwtSv.generateJwt(user);
            // and return the user with the new token
            console.log(
              'CARDONE =========> addJWTInterceptor OUT USER / TOKEN ',
              user,
              token,
            );
            return { user, token };
          } catch (error) {
            console.log('CARDONE =========> addJWTInterceptor ERROR ', error);
          }
        }),
      )
    );
  }
}

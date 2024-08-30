import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { JsonWebTokenService } from '../jsonWebToken/jsonWebToken.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class addJWTInterceptor implements NestInterceptor {
  constructor(private readonly jwtSv: JsonWebTokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (user) => {
        // ==> then gereate token
        const token = await this.jwtSv.generateJwt(user);
        // and return the user with the new token
        return { user, token };
      }),
    );
  }
}

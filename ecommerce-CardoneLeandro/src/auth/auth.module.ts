import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from 'config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserMiddleware } from './middleware/create-User.middleware';
import { JsonWebTokenService } from './jsonWebToken/jsonWebToken.service';
import { addJWTInterceptor } from './interceptor/addJWT.interceptor';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    CreateUserMiddleware,
    JsonWebTokenService,
    addJWTInterceptor,
    JwtStrategy,
  ],

  // ===> import and register jwt module
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig], // here we load the jwt config
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateUserMiddleware).forRoutes('auth/signup');
  }
}

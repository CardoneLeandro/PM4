import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JsonWebTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwt(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    const secret = this.configService.get<string>('jwt.secret');
    const signOptions = this.configService.get<object>('jwt.signOptions');
    return this.jwtService.sign(payload, { secret, ...signOptions });
  }
}

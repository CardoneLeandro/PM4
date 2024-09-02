import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { User } from '../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(readonly uRep: UsersRepository) {}

  //?     RUTA CREADA PARA VALIDAR LA EXITENCIA DE USUSARIOS EN LA BASE DE DATOS
  async validateUser(email: string): Promise<User | null> {
    return await this.uRep.findOneBy({ email });
  }
}

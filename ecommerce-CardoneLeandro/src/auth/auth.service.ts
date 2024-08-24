import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/users.repository';
import { User } from '../users/entities/users.entity'

@Injectable()
export class AuthService {
  constructor(readonly uRep: UserRepository) {}

 async validateUser(email:string):Promise <User | null> {
  return await this.uRep.findOneBy({email})
  
}

}

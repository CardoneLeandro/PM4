import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/users.repository';
import { User } from '../users/entities/users.entity'

@Injectable()
export class AuthService {
  constructor(readonly uRep: UserRepository) {}

 async validateUser(email:string, password:string):Promise <User | null> {
  const user:User = await this.uRep.findOneBy({email})
    if (!user) {return null}
    if (user.password !== password) {return null}
  return user
}
async loginUser(user:User):Promise<{accessToken: string}> {
const payload : { email= user.email, sub:user.id}
const accessToken = this.jwtService.sign(payload)
return {accessToken}
}

}

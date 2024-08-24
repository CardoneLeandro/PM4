import { Injectable, Param } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { User } from './entities/users.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private userRep: UserRepository) {}
  
  async findAll():Promise<User[]> {
    return this.userRep.getAll();
  }

async findOne(id: UUID):Promise<User|null> {
    const user = await this.userRep.getUserById(id)
    return user;
  }
  async create(data:Partial<User>):Promise<User|null> {
    const newUser = await this.userRep.createUser(data)
    return newUser;
  }

  async update(id: UUID, data:Partial<User>):Promise<User|null> {
    const updatedUser = await this.userRep.updateUser(id, data)
    return updatedUser
  }

  async remove(id:UUID):Promise<{id:UUID} | null> {
    return this.userRep.deleteUser(id)
  }

  async findOneBy(searchParam:Partial<User>):Promise<User|null> {
    const key = Object.keys(searchParam)[0]
    const value = Object.values(searchParam)[0]
    const user = await this.userRep.findOneBy({where:{[key]:value}})
    return user
  }
}

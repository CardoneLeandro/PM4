import { Injectable, Param } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { User } from './entities/users.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRep: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRep.getAll();
  }

  async findOne(id: UUID): Promise<User | null> {
    const user = await this.userRep.getUserById(id);
    return user;
  }
  async create(data: CreateUserDto): Promise<User | null> {
    const newUser = await this.userRep.createUser(data);
    return newUser;
  }

  async update(id: UUID, data: Partial<User>): Promise<User | null> {
    const updatedUser = await this.userRep.updateUser(id, data);
    return updatedUser;
  }

  async remove(id: UUID): Promise<{ id: UUID } | null> {
    return this.userRep.deleteUser(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRep.getUserByEmail(email);
  }

  async adminUpdate(id: UUID): Promise<User | null> {
    const updatedUser = await this.userRep.adminUpdate(id);
    return updatedUser;
  }
}

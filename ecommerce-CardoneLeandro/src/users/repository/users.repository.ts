import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../../common/enum/user.role';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dSource: DataSource) {
    super(User, dSource.getRepository(User).manager);
  }

  async getAll(): Promise<User[]> {
    return this.find();
  }

  async getUserById(id: UUID): Promise<User | null> {
    const user: User = await this.findOneBy({ id });
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user: User = await this.findOneBy({ email });
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User | null> {
    const newUser: User | null = this.create(data);
    const createdUser = await this.save(newUser);
    return createdUser;
  }

  async updateUser(id: UUID, data: Partial<User>): Promise<User | null> {
    const user: User | null = await this.findOneBy({ id });
    if (!user) {
      return null;
    }
    await this.update({ id }, data);
    const updateUser: User = await this.findOneBy({ id });
    return updateUser;
  }

  async deleteUser(id: UUID): Promise<{ id: UUID } | null> {
    const user: User | null = await this.findOneBy({ id });
    if (!user) {
      return null;
    }
    await this.delete({ id });
    return { id };
  }

  //?     RUTA CREADA PARA PUEBAS DE SEGURIDAD
  async adminUpdate(id: UUID): Promise<User | null> {
    await this.update({ id }, { role: UserRole.ADMIN });
    const admin = await this.findOneBy({ id });
    return admin;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { U_repository, User } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: U_repository) {}
  create(createUserDto: CreateUserDto) {
    const newId: number = this.repository.newId();
    const newUser: User = { id: newId, ...createUserDto };
    return this.repository.createUser(newUser);
  }

  findAll(): User[] {
    return this.repository.getAll();
  }

  findOne(id: number): User {
    return (
      console.log('===service===> ID', typeof id, id),
      this.repository.getById(id)
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('===service===> ID', typeof id, id, updateUserDto);
    return this.repository.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.removeUser(id);
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  city: string;
}

@Injectable()
export class U_repository {
  private users: User[] = [
    {
      id: 1,
      email: 'XHr5K@example.com',
      name: 'Leandro Cardone',
      password: '123456',
      address: 'Rua dos bobos, 0',
      phone: '123456789',
      country: 'Brasil',
      city: 'São Paulo',
    },
    {
      id: 2,
      email: '132hefsa@example.com',
      name: 'Maria Cardone',
      password: '234567',
      address: 'Juan Cruz, 10',
      phone: '987654321',
      country: 'Colombia',
      city: 'Bogota',
    },
    {
      id: 3,
      email: '3hefsa@example.com',
      name: 'Carlos Cardone',
      password: '345678',
      address: 'Calle 8, 12',
      phone: '123456789',
      country: 'Chile',
      city: 'Santiago',
    },
    {
      id: 4,
      email: '4hefsa@example.com',
      name: 'Ana Cardone',
      password: '456789',
      address: 'Calle 9, 13',
      phone: '987654321',
      country: 'Peru',
      city: 'Lima',
    },
    {
      id: 5,
      email: '5hefsa@example.com',
      name: 'Luis Cardone',
      password: '567890',
      address: 'Calle 10, 14',
      phone: '123456789',
      country: 'Venezuela',
      city: 'Caracas',
    },
  ];

  newId() {
    return this.users.length + 1;
  }
  getAll() {
    return this.users;
  }

  getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(newUser: User) {
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatingDate: UpdateUserDto) {
    console.log('===repository===>', id, updatingDate);
    const index: number | undefined = this.users.findIndex(
      (user) => user.id === id,
    );
    console.log('===repository===>', index);
    if (index === -1) {
      return 'User not found';
    }
    this.users[index] = { ...this.users[index], ...updatingDate };
    return this.users[index];
  }

  removeUser(id: number) {
    const index: number | undefined = this.users.findIndex(
      (user) => user.id === id,
    );
    if (index === -1) {
      return 'User not found';
    }
    this.users[index] = { ...this.users[index], password: 'DELETED' };
    return this.users[index];
  }

  singIn(userEmail: string, Password: string) {
    if (!userEmail || !Password) {
      return 'all fields are required';
    }
    const user: User | undefined = this.users.find(
      (user) => user.email === userEmail,
    );
    if (user === undefined) {
      return 'invalid credentials';
    }
    if (user.password !== Password) {
      return 'invalid credentials';
    }
    return user;
  }
}

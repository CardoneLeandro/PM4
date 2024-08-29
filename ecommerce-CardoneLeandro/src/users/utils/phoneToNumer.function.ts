import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/users.entity';

export const phoneToNumer = (data: CreateUserDto): Partial<User> => {
  const phoneToNumer: number = Number(data.phone);
  return { phone: phoneToNumer, ...data };
};

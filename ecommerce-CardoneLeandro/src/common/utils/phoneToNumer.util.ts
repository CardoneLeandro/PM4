import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/users.entity';

export const phoneToNumer = (data: CreateUserDto): Partial<User> => {
  const phoneToNumer: number = Number(data.phone);
  return { phone: phoneToNumer, ...data };
};

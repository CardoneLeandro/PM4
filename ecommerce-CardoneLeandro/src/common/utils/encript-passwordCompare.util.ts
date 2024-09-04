import { User } from 'src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';

export const encriptPasswordCompare = async (
  user: User,
  password: string,
): Promise<boolean> => {
  const IsValidPassword = await bcrypt.compare(password, user.password);
  return IsValidPassword;
};

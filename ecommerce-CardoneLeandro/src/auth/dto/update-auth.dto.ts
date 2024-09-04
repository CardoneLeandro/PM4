import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/common/enum/user.role';
export class UpdateAuthDto extends PartialType(CreateUserDto) {
<<<<<<< HEAD
  role: UserRole.ADMIN;
=======
    role: UserRole.ADMIN
>>>>>>> 43f08683d353a78355d56b7f75990ed2bfa75512
}

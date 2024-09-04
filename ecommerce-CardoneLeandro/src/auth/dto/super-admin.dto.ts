import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from 'src/common/enum/user.role';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SuperAdminDto extends PartialType(CreateUserDto) {
  role: UserRole.SUPERADMIN;
}

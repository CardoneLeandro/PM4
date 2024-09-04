import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '../../common/enum/user.role';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserToAdminDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  role: UserRole.ADMIN;
}

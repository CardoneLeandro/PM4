import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/common/enum/user.role';
export class UpdateAuthDto extends PartialType(CreateUserDto) {
    role: UserRole.ADMIN
}

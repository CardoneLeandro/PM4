import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity'; // Ruta a la entidad
import { UsersRepository } from './repository/users.repository';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { RemoveRoleInterceptor } from 'src/common/interceptor/remove-role.interceptor';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule], // Importa la entidad
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AuthHeaderGuard,
    RolesGuard,
    RemoveRoleInterceptor,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}

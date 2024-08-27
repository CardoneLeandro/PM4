import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity'; // Ruta a la entidad
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importa la entidad
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}

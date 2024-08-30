import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';
import { User } from './entities/users.entity';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { StringToNumberInterceptor } from '../common/interceptor/string-toNumber.interceptor';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPasswordEncripInterceptor } from '../auth/interceptor/user-passwordEncrip.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthHeaderGuard)
  async findAll(): Promise<User[] | null> {
    try {
      return this.usersService.findAll();
    } catch (e) {
      throw new BadRequestException(
        `An error occurred during the process: ${e.message}`,
      );
    }
  }
  @Get(':id')
  @UseGuards(AuthHeaderGuard)
  @UsePipes(IsUUIDPipe)
  async findOne(@Param('id') id: UUID): Promise<User | null> {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new BadRequestException(`User not found with id ${id}`);
      }
      return user;
    } catch (e) {
      throw new BadRequestException(
        `An error occurred during the process: ${e.message}`,
      );
    }
  }
  //====>> encriptar contrasña
  //==>> apartado migrado a auth/singup
  //==> esta runa ya no es necesaria
  @Post()
  @UsePipes(new DTOValidationPipe())
  @UseInterceptors(StringToNumberInterceptor)
  @UseInterceptors(UserPasswordEncripInterceptor)
  async create(@Body() data: CreateUserDto): Promise<User | null> {
    try {
      const newUser: User | null = await this.usersService.create(data);
      if (!newUser) {
        throw new BadRequestException(
          'An error occurred during the creation process',
        );
      }
      return newUser;
    } catch (e) {
      throw new BadRequestException(
        `An error occurred during the process: ${e.message}`,
      );
    }
  }

  @Put(':id')
  @UseGuards(AuthHeaderGuard)
  @UsePipes(IsUUIDPipe)
  @UsePipes(new DTOValidationPipe())
  @UseInterceptors(StringToNumberInterceptor)
  async update(
    @Param('id') id: UUID,
    @Body() data: UpdateUserDto,
  ): Promise<User | null> {
    try {
      const updateUser: User | null = await this.usersService.update(id, data);
      if (!updateUser) {
        throw new BadRequestException(
          'An error occurred during the update process',
        );
      }
      return updateUser;
    } catch (e) {
      throw new BadRequestException(
        `An error occurred during the process: ${e.message}`,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthHeaderGuard)
  @UsePipes(IsUUIDPipe)
  async remove(@Param('id') id: UUID): Promise<{ id: UUID } | null> {
    try {
      const isRemoved = await this.usersService.remove(id);
      if (!isRemoved) {
        throw new BadRequestException(
          'An error occurred during the deletion process',
        );
      }
      return isRemoved;
    } catch (e) {
      throw new BadRequestException(
        `An error occurred during the process: ${e.message}`,
      );
    }
  }
}

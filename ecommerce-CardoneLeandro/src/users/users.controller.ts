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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guard/auth-guard.guard';
import { User } from './entities/users.entity';
import { UUID } from 'crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Get()
  @UseGuards(AuthGuard)
  async findAll():Promise<User[]|null> {
    try {
    return this.usersService.findAll();
    } catch (e) {
      throw new BadRequestException(`An error occurred during the process: ${e.message}`)
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id:UUID):Promise<User|null> {
  try {
    const user = this.usersService.findOne(id)
    if(!user) {throw new BadRequestException(`User not found with id ${id}`)}
    return user
  } catch (e) {
    throw new BadRequestException(`An error occurred during the process: ${e.message}`)
  }
  }

  @Post()
  @UseGuards()
  @UsePipes()
  async create(@Body() data:Partial<User>):Promise<User | null> {
    try {
    const newUser:User | null = await this.usersService.create(data)
    if(!newUser) {throw new BadRequestException('An error occurred during the creation process')}
    return newUser
    }catch (e) {
      throw new BadRequestException(`An error occurred during the process: ${e.message}`);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: UUID, @Body() data:Partial<User>):Promise<User|null> {
    try {
      const updateUser: User | null = await this.usersService.update(id, data)
      if(!updateUser) {throw new BadRequestException('An error occurred during the update process')} 
    return updateUser
    }catch (e) {
      throw new BadRequestException(`An error occurred during the process: ${e.message}`);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: UUID): Promise<{id:UUID} | null> {
    try {
      const isRemoved = await this.usersService.remove(id)
      if (!isRemoved) {throw new BadRequestException('An error occurred during the deletion process')}
      return isRemoved
    }catch (e) {
      throw new BadRequestException(`An error occurred during the process: ${e.message}`);
    }
    
  }
}
